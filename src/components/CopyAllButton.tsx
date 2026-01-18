import { Copy, Check } from 'lucide-react';
import type { CopiedState } from '../types';

interface CopyAllButtonProps {
    count: number;
    copied: CopiedState;
    onCopyAll: () => void;
}

export function CopyAllButton({ count, copied, onCopyAll }: CopyAllButtonProps) {
    const isCopied = copied === 'all';

    return (
        <div className="flex items-center justify-between">
      <span className="text-sm text-blue-200/70">
        <span className="font-semibold text-white">{count}</span> MEPs found
      </span>
            <button
                onClick={onCopyAll}
                disabled={count === 0}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium shadow-lg shadow-blue-500/25"
            >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
                {isCopied ? 'Copied!' : 'Copy All Emails'}
            </button>
        </div>
    );
}