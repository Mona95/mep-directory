import { Loader2 } from 'lucide-react';

export function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={48} className="text-blue-400 animate-spin mb-4" />
            <p className="text-blue-200 text-lg">Loading MEP data...</p>
            <p className="text-blue-300/50 text-sm mt-2">
                Fetching from European Parliament
            </p>
        </div>
    );
}