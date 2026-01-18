import type { MEP } from '@/types';

export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
}

export function formatEmailsForCopy(meps: MEP[]): string {
    return meps.map(m => m.email).join(', ');
}