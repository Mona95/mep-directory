import { HardDrive, Loader2, FolderOpen } from 'lucide-react';

interface SaveToastProps {
  status: 'idle' | 'saving' | 'saved' | 'restored';
  lastSavedAgo: string;
}

export function SaveToast({ status, lastSavedAgo }: SaveToastProps) {
  if (status === 'idle') return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-fade-in">
      <div className={`
        flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium
        ${status === 'saving' ? 'bg-slate-700 text-slate-200' : ''}
        ${status === 'saved' ? 'bg-green-600 text-white' : ''}
        ${status === 'restored' ? 'bg-amber-600 text-white' : ''}
      `}>
        {status === 'saving' && (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Saving...</span>
          </>
        )}
        {status === 'saved' && (
          <>
            <HardDrive size={16} />
            <span>Draft saved {lastSavedAgo}</span>
          </>
        )}
        {status === 'restored' && (
          <>
            <FolderOpen size={16} />
            <span>Draft restored from last session</span>
          </>
        )}
      </div>
    </div>
  );
}
