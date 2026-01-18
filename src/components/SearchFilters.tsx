import { Search, ChevronDown } from 'lucide-react';

interface SearchFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    country: string;
    onCountryChange: (value: string) => void;
    group: string;
    onGroupChange: (value: string) => void;
    countries: string[];
    groups: string[];
    showCountryFilter?: boolean; // Only show country dropdown when browsing all
}

export function SearchFilters({
                                  search,
                                  onSearchChange,
                                  country,
                                  onCountryChange,
                                  group,
                                  onGroupChange,
                                  countries,
                                  groups,
                                  showCountryFilter = false,
                              }: SearchFiltersProps) {
    return (
        <div className="flex flex-col md:flex-row gap-3 mb-4">
            {/* Search Input */}
            <div className="relative flex-1">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300"
                    size={20}
                />
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={e => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
            </div>

            {/* Country Filter - only shown when browsing all countries */}
            {showCountryFilter && (
                <div className="relative">
                    <select
                        value={country}
                        onChange={e => onCountryChange(e.target.value)}
                        className="appearance-none w-full md:w-48 px-4 py-3 pr-10 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                    >
                        <option value="" className="bg-slate-800">All Countries</option>
                        {countries.map(c => (
                            <option key={c} value={c} className="bg-slate-800">{c}</option>
                        ))}
                    </select>
                    <ChevronDown
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 pointer-events-none"
                        size={18}
                    />
                </div>
            )}

            {/* Group Filter */}
            <div className="relative">
                <select
                    value={group}
                    onChange={e => onGroupChange(e.target.value)}
                    className="appearance-none w-full md:w-48 px-4 py-3 pr-10 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                >
                    <option value="" className="bg-slate-800">All Groups</option>
                    {groups.map(g => (
                        <option key={g} value={g} className="bg-slate-800">{g}</option>
                    ))}
                </select>
                <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 pointer-events-none"
                    size={18}
                />
            </div>
        </div>
    );
}