import { useState, useEffect } from 'react';

// Map browser locale to EU country names
const localeToCountry: Record<string, string> = {
    'de': 'Germany', 'de-AT': 'Austria', 'de-DE': 'Germany',
    'fr': 'France', 'fr-FR': 'France', 'fr-BE': 'Belgium',
    'it': 'Italy', 'it-IT': 'Italy',
    'es': 'Spain', 'es-ES': 'Spain',
    'pt': 'Portugal', 'pt-PT': 'Portugal',
    'nl': 'Netherlands', 'nl-NL': 'Netherlands', 'nl-BE': 'Belgium',
    'pl': 'Poland', 'pl-PL': 'Poland',
    'ro': 'Romania', 'ro-RO': 'Romania',
    'el': 'Greece', 'el-GR': 'Greece',
    'cs': 'Czechia', 'cs-CZ': 'Czechia',
    'hu': 'Hungary', 'hu-HU': 'Hungary',
    'sv': 'Sweden', 'sv-SE': 'Sweden',
    'bg': 'Bulgaria', 'bg-BG': 'Bulgaria',
    'da': 'Denmark', 'da-DK': 'Denmark',
    'fi': 'Finland', 'fi-FI': 'Finland',
    'sk': 'Slovakia', 'sk-SK': 'Slovakia',
    'hr': 'Croatia', 'hr-HR': 'Croatia',
    'lt': 'Lithuania', 'lt-LT': 'Lithuania',
    'sl': 'Slovenia', 'sl-SI': 'Slovenia',
    'lv': 'Latvia', 'lv-LV': 'Latvia',
    'et': 'Estonia', 'et-EE': 'Estonia',
    'mt': 'Malta', 'mt-MT': 'Malta',
    'ga': 'Ireland', 'en-IE': 'Ireland',
    'lb': 'Luxembourg', 'fr-LU': 'Luxembourg', 'de-LU': 'Luxembourg',
};

export function useUserCountry(): string | undefined {
    const [country, setCountry] = useState<string | undefined>();

    useEffect(() => {
        // Try to detect from browser locale
        const locales = navigator.languages || [navigator.language];

        for (const locale of locales) {
            // Try exact match first
            if (localeToCountry[locale]) {
                setCountry(localeToCountry[locale]);
                return;
            }
            // Try language part only
            const lang = locale.split('-')[0];
            if (localeToCountry[lang]) {
                setCountry(localeToCountry[lang]);
                return;
            }
        }
    }, []);

    return country;
}