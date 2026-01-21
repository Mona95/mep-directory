import { useState, useMemo } from 'react';
import { Search, ExternalLink, ChevronRight } from 'lucide-react';
import type { MEP } from '../../types';

interface Step1MEPSelectorProps {
  meps: MEP[];
  selectedMep: MEP | null;
  onSelectMep: (mep: MEP) => void;
  onContinue: () => void;
}

export function Step1MEPSelector({
  meps,
  selectedMep,
  onSelectMep,
  onContinue,
}: Step1MEPSelectorProps) {
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');

  const countries = useMemo(() => {
    const unique = [...new Set(meps.map(m => m.country))].sort();
    return unique;
  }, [meps]);

  const groups = useMemo(() => {
    const unique = [...new Set(meps.map(m => m.group))].sort();
    return unique;
  }, [meps]);

  const filteredMeps = useMemo(() => {
    return meps.filter(mep => {
      const matchesSearch = search === '' ||
        mep.name.toLowerCase().includes(search.toLowerCase()) ||
        mep.email.toLowerCase().includes(search.toLowerCase());
      const matchesCountry = countryFilter === '' || mep.country === countryFilter;
      const matchesGroup = groupFilter === '' || mep.group === groupFilter;
      return matchesSearch && matchesCountry && matchesGroup;
    });
  }, [meps, search, countryFilter, groupFilter]);

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-2">Step 1: Choose MEP</h2>
      <p className="text-blue-200/70 mb-4">Who do you want to contact?</p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
        >
          <option value="">All Countries</option>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
        >
          <option value="">All Groups</option>
          {groups.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      {/* MEP List */}
      <div className="max-h-80 overflow-y-auto space-y-2 mb-4">
        {filteredMeps.length === 0 ? (
          <p className="text-white/50 text-center py-8">No MEPs match your filters</p>
        ) : (
          filteredMeps.map(mep => (
            <button
              key={mep.id}
              onClick={() => onSelectMep(mep)}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left
                ${selectedMep?.id === mep.id
                  ? 'bg-blue-500/30 border-2 border-blue-500'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }
              `}
            >
              <img
                src={mep.photoUrl}
                alt={mep.name}
                className="w-12 h-12 rounded-full object-cover bg-white/10"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(mep.name)}&background=3b82f6&color=fff`;
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white truncate">{mep.name}</span>
                  {selectedMep?.id === mep.id && (
                    <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">Selected</span>
                  )}
                </div>
                <div className="text-sm text-white/60">
                  {mep.country} · {mep.group}
                </div>
              </div>
              <a
                href={mep.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 text-white/40 hover:text-blue-400 transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            </button>
          ))
        )}
      </div>

      {/* Continue button */}
      <div className="flex justify-end">
        <button
          onClick={onContinue}
          disabled={!selectedMep}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
            ${selectedMep
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
            }
          `}
        >
          Continue to Step 2
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
