import { Users } from 'lucide-react';
import { PARLIAMENT_TERM, TOTAL_MEP_SEATS } from '../constants/groups';

interface HeaderProps {
    totalShown: number;
    loading?: boolean;
}

export function Header({ totalShown, loading }: HeaderProps) {
    return (
        <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-blue-500/30">
                <Users size={16} />
                {PARLIAMENT_TERM}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                MEP Email Directory
            </h1>
            <p className="text-blue-200/70">
                Contact your representatives •{' '}
                {loading ? (
                    <span className="animate-pulse">Loading...</span>
                ) : (
                    <>
                        {totalShown} MEPs loaded • {TOTAL_MEP_SEATS} total seats
                    </>
                )}
            </p>
        </div>
    );
}