import { MapPin } from 'lucide-react';

interface CountrySelectorProps {
    countries: string[];
    onSelect: (country: string) => void;
}

// Country to flag emoji mapping
const countryFlags: Record<string, string> = {
    'Austria': '🇦🇹', 'Belgium': '🇧🇪', 'Bulgaria': '🇧🇬', 'Croatia': '🇭🇷',
    'Cyprus': '🇨🇾', 'Czechia': '🇨🇿', 'Denmark': '🇩🇰', 'Estonia': '🇪🇪',
    'Finland': '🇫🇮', 'France': '🇫🇷', 'Germany': '🇩🇪', 'Greece': '🇬🇷',
    'Hungary': '🇭🇺', 'Ireland': '🇮🇪', 'Italy': '🇮🇹', 'Latvia': '🇱🇻',
    'Lithuania': '🇱🇹', 'Luxembourg': '🇱🇺', 'Malta': '🇲🇹', 'Netherlands': '🇳🇱',
    'Poland': '🇵🇱', 'Portugal': '🇵🇹', 'Romania': '🇷🇴', 'Slovakia': '🇸🇰',
    'Slovenia': '🇸🇮', 'Spain': '🇪🇸', 'Sweden': '🇸🇪',
};

export function CountrySelector({ countries, onSelect }: CountrySelectorProps) {
    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10">
            <div className="text-center mb-6">
                <MapPin size={32} className="mx-auto text-blue-400 mb-3" />
                <h2 className="text-xl font-semibold text-white mb-2">
                    Select your country
                </h2>
                <p className="text-blue-200/70 text-sm">
                    Find MEPs representing your country in the European Parliament
                </p>
            </div>

            {/* All countries grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {countries.map(country => (
                    <button
                        key={country}
                        onClick={() => onSelect(country)}
                        className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all text-left"
                    >
                        <span className="text-lg">{countryFlags[country] || '🇪🇺'}</span>
                        <span className="text-white text-sm truncate">{country}</span>
                    </button>
                ))}
            </div>

            {/* Show all option */}
            <button
                onClick={() => onSelect('')}
                className="w-full mt-4 p-3 text-blue-300/70 hover:text-blue-200 text-sm transition-colors"
            >
                Or browse all {countries.length} countries →
            </button>
        </div>
    );
}