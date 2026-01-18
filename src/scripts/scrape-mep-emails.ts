/**
 * MEP Email Scraper (Puppeteer version)
 *
 * Run with: npx ts-node scripts/scrape-mep-emails.ts
 * Or: npx tsx scripts/scrape-mep-emails.ts
 *
 * This script:
 * 1. Fetches MEP list from EP XML endpoint
 * 2. Scrapes each MEP's page for their verified email using Puppeteer
 * 3. Saves complete data to src/data/meps.json
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface MEP {
    id: number;
    epId: string;
    name: string;
    country: string;
    group: string;
    email: string;
    photoUrl: string;
    profileUrl: string;
}

const EP_XML_URL = 'https://www.europarl.europa.eu/meps/en/full-list/xml';
const DELAY_MS = 100; // Delay between requests to be respectful
const CONCURRENT_PAGES = 5; // Number of parallel browser tabs

async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchXML(): Promise<string> {
    console.log('Fetching MEP list from EP...');
    const response = await fetch(EP_XML_URL);
    if (!response.ok) throw new Error(`Failed to fetch XML: ${response.status}`);
    return response.text();
}

function parseXML(xml: string): Array<{ epId: string; name: string; country: string; group: string }> {
    const meps: Array<{ epId: string; name: string; country: string; group: string }> = [];

    // Simple regex parsing for Node.js (no DOM)
    const mepRegex = /<mep>([\s\S]*?)<\/mep>/g;
    const idRegex = /<id>(\d+)<\/id>/;
    const nameRegex = /<fullName>([^<]+)<\/fullName>/;
    const countryRegex = /<country>([^<]+)<\/country>/;
    const groupRegex = /<politicalGroup>([^<]+)<\/politicalGroup>/;

    let match;
    while ((match = mepRegex.exec(xml)) !== null) {
        const mepXml = match[1];
        const id = idRegex.exec(mepXml)?.[1] || '';
        const name = nameRegex.exec(mepXml)?.[1] || '';
        const country = countryRegex.exec(mepXml)?.[1] || '';
        const group = groupRegex.exec(mepXml)?.[1] || 'NI';

        if (id && name) {
            meps.push({ epId: id, name, country, group: mapGroup(group) });
        }
    }

    return meps;
}

function mapGroup(fullName: string): string {
    const map: Record<string, string> = {
        "Group of the European People's Party": 'EPP',
        'Group of the Progressive Alliance of Socialists and Democrats': 'S&D',
        'Renew Europe Group': 'Renew',
        'Group of the Greens/European Free Alliance': 'Greens/EFA',
        'European Conservatives and Reformists Group': 'ECR',
        'Patriots for Europe Group': 'PfE',
        'The Left group in the European Parliament - GUE/NGL': 'The Left',
        'Europe of Sovereign Nations Group': 'ESN',
        'Non-attached Members': 'NI',
    };

    for (const [key, value] of Object.entries(map)) {
        if (fullName.includes(key) || fullName.includes(value)) {
            return value;
        }
    }
    return 'NI';
}

async function scrapeEmail(page: puppeteer.Page, epId: string): Promise<string | null> {
    try {
        const url = `https://www.europarl.europa.eu/meps/en/${epId}`;
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

        // Wait for the email link to appear
        await page.waitForSelector('a.link_email', { timeout: 10000 });

        // Extract the email
        const email = await page.$eval('a.link_email', el => {
            const href = el.getAttribute('href');
            return href?.replace('mailto:', '') || null;
        });

        return email;
    } catch (error) {
        // If selector not found or timeout, return null
        return null;
    }
}

async function main() {
    console.log('=== MEP Email Scraper (Puppeteer) ===\n');

    // 1. Fetch and parse MEP list
    const xml = await fetchXML();
    const rawMeps = parseXML(xml);
    console.log(`Found ${rawMeps.length} MEPs\n`);

    // 2. Launch browser once for all requests
    console.log('Launching browser...\n');
    const browser = await puppeteer.launch({
        headless: true, // Set to false if you want to see the browser
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // 3. Scrape emails for each MEP with parallel processing
    const meps: MEP[] = new Array(rawMeps.length);
    let successCount = 0;
    let failCount = 0;
    let completed = 0;

    // Process MEPs in chunks using multiple browser tabs
    const processMEP = async (pageInstance: puppeteer.Page, index: number) => {
        const raw = rawMeps[index];
        const progress = `[${index + 1}/${rawMeps.length}]`;

        process.stdout.write(`${progress} Scraping ${raw.name}...`);

        const email = await scrapeEmail(pageInstance, raw.epId);

        if (email) {
            successCount++;
            console.log(` ✓ ${email}`);
        } else {
            failCount++;
            console.log(' ✗ Not found');
        }

        meps[index] = {
            id: index + 1,
            epId: raw.epId,
            name: raw.name,
            country: raw.country,
            group: raw.group,
            email: email || '',
            photoUrl: `https://www.europarl.europa.eu/mepphoto/${raw.epId}.jpg`,
            profileUrl: `https://www.europarl.europa.eu/meps/en/${raw.epId}`,
        };

        completed++;
        await sleep(DELAY_MS);
    };

    // Create worker pages
    const workers = [];
    for (let i = 0; i < CONCURRENT_PAGES; i++) {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        workers.push(page);
    }

    // Process MEPs in parallel
    let currentIndex = 0;
    const workerPromises = workers.map(async (page) => {
        while (currentIndex < rawMeps.length) {
            const index = currentIndex++;
            await processMEP(page, index);
        }
    });

    await Promise.all(workerPromises);

    // 4. Close browser
    await browser.close();
    console.log('\nBrowser closed.\n');

    // 5. Save to JSON files
    const outputPath = path.join(__dirname, '..', 'data', 'meps.json');
    const outputDir = path.dirname(outputPath);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const output = {
        lastUpdated: new Date().toISOString(),
        totalMeps: meps.length,
        meps: meps,
    };

    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

    // 6. Summary
    console.log('=== Summary ===');
    console.log(`Total MEPs: ${meps.length}`);
    console.log(`Emails found: ${successCount}`);
    console.log(`Emails missing: ${failCount}`);
    console.log(`Output: ${outputPath}`);
    console.log(`Last updated: ${output.lastUpdated}`);
}

main().catch(console.error);