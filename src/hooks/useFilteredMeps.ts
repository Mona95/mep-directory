import { useMemo } from 'react';
import type { MEP, FilterState } from '@/types';

export function useFilteredMeps(meps: MEP[] | null, filters: FilterState): MEP[] {
    return useMemo(() => {
        if (!meps) return [];

        const { search, country, group } = filters;
        const searchLower = search.toLowerCase();

        return meps.filter(mep => {
            const matchesSearch =
                mep.name.toLowerCase().includes(searchLower) ||
                mep.email.toLowerCase().includes(searchLower);
            const matchesCountry = !country || mep.country === country;
            const matchesGroup = !group || mep.group === group;

            return matchesSearch && matchesCountry && matchesGroup;
        });
    }, [meps, filters]);
}