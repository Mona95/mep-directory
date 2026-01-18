import { Filter } from 'lucide-react';
import { MEPCard } from './MEPCard';
import type { MEP, CopiedState } from '../types';

interface MEPListProps {
    meps: MEP[];
    copied: CopiedState;
    onCopy: (email: string, id: number) => void;
}

export function MEPList({ meps, copied, onCopy }: MEPListProps) {
    if (meps.length === 0) {
        return (
            <div className="text-center py-12 text-blue-200/50">
                <Filter size={48} className="mx-auto mb-4 opacity-50" />
                <p>No MEPs match your filters</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {meps.map(mep => (
                <MEPCard
                    key={mep.id}
                    mep={mep}
                    copied={copied}
                    onCopy={onCopy}
                />
            ))}
        </div>
    );
}