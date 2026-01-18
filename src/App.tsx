import { useState, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useMeps } from './hooks/useMeps';
import { useFilteredMeps } from './hooks/useFilteredMeps';
import { getCountries, getGroups } from './services/mepApi';
import { copyToClipboard, formatEmailsForCopy } from './utils/clipboard';
import { Header } from './components/Header';
import { CountrySelector } from './components/CountrySelector';
import { SearchFilters } from './components/SearchFilters';
import { MEPList } from './components/MEPList';
import { CopyAllButton } from './components/CopyAllButton';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import type { CopiedState } from './types';

export default function App() {
    // Fetch MEP data
    const { data: meps, loading, error, refetch } = useMeps();

    // Country selection state - null means show country selector
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    // Other filter state
    const [search, setSearch] = useState('');
    const [group, setGroup] = useState('');

    // Copy feedback state
    const [copied, setCopied] = useState<CopiedState>(null);

    // Derived data
    const countries = useMemo(() => (meps ? getCountries(meps) : []), [meps]);
    const groups = useMemo(() => (meps ? getGroups(meps) : []), [meps]);

    // Filter by selected country (or all if empty string selected via "browse all")
    const countryFilter = selectedCountry === '' ? '' : (selectedCountry || '');

    // Get filtered MEPs
    const filteredMeps = useFilteredMeps(meps, {
        search,
        country: countryFilter,
        group
    });

    // Copy handlers
    const handleCopyEmail = async (email: string, id: number): Promise<void> => {
        const success = await copyToClipboard(email);
        if (success) {
            setCopied(id);
            setTimeout(() => setCopied(null), 2000);
        }
    };

    const handleCopyAll = async (): Promise<void> => {
        const emails = formatEmailsForCopy(filteredMeps);
        const success = await copyToClipboard(emails);
        if (success) {
            setCopied('all');
            setTimeout(() => setCopied(null), 2000);
        }
    };

    // Handle country selection
    const handleCountrySelect = (country: string) => {
        setSelectedCountry(country);
        setSearch(''); // Reset search when changing country
        setGroup(''); // Reset group filter
    };

    // Go back to country selection
    const handleBackToCountries = () => {
        setSelectedCountry(null);
        setSearch('');
        setGroup('');
    };

    // Show country selector if no country selected yet
    const showCountrySelector = selectedCountry === null && meps && !loading && !error;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <Header
                    totalShown={meps?.length || 0}
                    loading={loading}
                />

                {/* Loading State */}
                {loading && <LoadingState />}

                {/* Error State */}
                {error && !loading && (
                    <ErrorState message={error} onRetry={refetch} />
                )}

                {/* Country Selector (initial view) */}
                {showCountrySelector && (
                    <CountrySelector
                        countries={countries}
                        onSelect={handleCountrySelect}
                    />
                )}

                {/* MEP List View (after country selected) */}
                {meps && !loading && !error && selectedCountry !== null && (
                    <>
                        {/* Back button + Country indicator */}
                        <button
                            onClick={handleBackToCountries}
                            className="flex items-center gap-2 text-blue-300 hover:text-white mb-4 transition-colors"
                        >
                            <ArrowLeft size={18} />
                            <span>
                {selectedCountry ? `Back to countries` : 'Select a country'}
              </span>
                        </button>

                        {/* Current selection indicator */}
                        {selectedCountry && (
                            <div className="mb-4 text-center">
                <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 px-4 py-2 rounded-full text-sm border border-blue-500/30">
                  Showing MEPs from <strong>{selectedCountry}</strong>
                </span>
                            </div>
                        )}

                        {/* Filters Card */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-6 mb-6 border border-white/10">
                            <SearchFilters
                                search={search}
                                onSearchChange={setSearch}
                                country={selectedCountry}
                                onCountryChange={handleCountrySelect}
                                group={group}
                                onGroupChange={setGroup}
                                countries={countries}
                                groups={groups}
                                showCountryFilter={selectedCountry === ''} // Only show if browsing all
                            />
                            <CopyAllButton
                                count={filteredMeps.length}
                                copied={copied}
                                onCopyAll={handleCopyAll}
                            />
                        </div>

                        {/* MEP List */}
                        <MEPList
                            meps={filteredMeps}
                            copied={copied}
                            onCopy={handleCopyEmail}
                        />

                        {/* Data source info */}
                        <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                            <p className="text-green-200 text-sm text-center">
                                ✓ Live data from European Parliament • {filteredMeps.length} MEPs shown •{' '}
                                <button
                                    onClick={refetch}
                                    className="underline hover:text-green-100"
                                >
                                    Refresh data
                                </button>
                            </p>
                        </div>
                    </>
                )}

                {/* Footer */}
                <p className="text-center text-xs text-blue-300/40 mt-6">
                    Source: europarl.europa.eu • Email format: firstname.lastname@europarl.europa.eu
                </p>
            </div>
        </div>
    );
}