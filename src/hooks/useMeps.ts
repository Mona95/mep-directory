import { useState, useEffect, useCallback } from 'react';
import type { MEP, FetchState } from '@/types';
import { fetchMEPs } from '../services/mepApi';

// Cache key for localStorage
const CACHE_KEY = 'mep_directory_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CachedData {
    meps: MEP[];
    timestamp: number;
}

/**
 * Get cached data if still valid
 */
function getCachedData(): MEP[] | null {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const { meps, timestamp }: CachedData = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_DURATION;

        if (isExpired) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }

        return meps;
    } catch {
        return null;
    }
}

/**
 * Cache MEP data
 */
function setCachedData(meps: MEP[]): void {
    try {
        const data: CachedData = { meps, timestamp: Date.now() };
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch {
        // localStorage might be full or unavailable
    }
}

/**
 * Hook to fetch and manage MEP data
 */
export function useMeps(): FetchState<MEP[]> & { refetch: () => void } {
    const [state, setState] = useState<FetchState<MEP[]>>({
        data: null,
        loading: true,
        error: null,
    });

    const fetchData = useCallback(async (useCache = true) => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        // Try cache first
        if (useCache) {
            const cached = getCachedData();
            if (cached && cached.length > 0) {
                setState({ data: cached, loading: false, error: null });
                return;
            }
        }

        try {
            const meps = await fetchMEPs();
            setCachedData(meps);
            setState({ data: meps, loading: false, error: null });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch MEPs';
            setState({ data: null, loading: false, error: message });
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = useCallback(() => {
        localStorage.removeItem(CACHE_KEY);
        fetchData(false);
    }, [fetchData]);

    return { ...state, refetch };
}