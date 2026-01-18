import type { MEP } from '../types';
import mepsData from '../data/meps.json';

/**
 * Get MEPs from static JSON file
 */
export async function fetchMEPs(): Promise<MEP[]> {
    return mepsData.meps;
}

export function getCountries(meps: MEP[]): string[] {
    return Array.from(new Set(meps.map(m => m.country))).filter(Boolean).sort();
}

export function getGroups(meps: MEP[]): string[] {
    return Array.from(new Set(meps.map(m => m.group))).filter(Boolean).sort();
}