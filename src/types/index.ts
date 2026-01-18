// MEP (Member of European Parliament) type
export interface MEP {
    id: number;
    epId: string;
    name: string;
    country: string;
    group: string;
    email: string;
    photoUrl: string;
    profileUrl: string;
}

// MEP data file structure
export interface MEPData {
    lastUpdated: string;
    totalMeps: number;
    meps: MEP[];
}

// Political group metadata
export interface GroupInfo {
    name: string;
    color: string;
}

// Filter state for MEP search
export interface FilterState {
    search: string;
    country: string;
    group: string;
}

// Copied state can be MEP id, 'all', or null
export type CopiedState = number | 'all' | null;

// API fetch state
export interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}