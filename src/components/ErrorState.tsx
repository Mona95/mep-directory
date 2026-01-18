import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
    message: string;
    onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle size={48} className="text-red-400 mb-4" />
            <p className="text-red-200 text-lg mb-2">Failed to load MEP data</p>
            <p className="text-red-300/70 text-sm mb-6 text-center max-w-md">
                {message}
            </p>
            <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-all font-medium"
            >
                <RefreshCw size={18} />
                Try Again
            </button>
            <p className="text-blue-300/40 text-xs mt-6 text-center max-w-sm">
                If the problem persists, the European Parliament API may be temporarily unavailable.
            </p>
        </div>
    );
}