import { X, Clock, RotateCcw, Play } from 'lucide-react';

interface InactivityPromptProps {
  isOpen: boolean;
  onContinue: () => void;
  onReset: () => void;
}

export function InactivityPrompt({ isOpen, onContinue, onReset }: InactivityPromptProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-slate-800 rounded-2xl max-w-sm w-full border border-white/10 shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <div className="p-2 bg-amber-500/20 rounded-lg">
            <Clock className="text-amber-400" size={20} />
          </div>
          <h2 className="text-lg font-semibold text-white">Still working?</h2>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-blue-200/80 text-sm mb-4">
            Your draft has been inactive for a while. Would you like to continue where you left off, or start fresh?
          </p>

          <div className="space-y-2">
            <button
              onClick={onContinue}
              className="w-full flex items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
            >
              <Play size={18} />
              Continue my draft
            </button>

            <button
              onClick={onReset}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
            >
              <RotateCcw size={18} />
              Start fresh
            </button>
          </div>
        </div>

        {/* Footer note */}
        <div className="px-4 pb-4">
          <p className="text-xs text-white/40 text-center">
            Drafts are cleared after extended inactivity to protect your privacy.
          </p>
        </div>
      </div>
    </div>
  );
}
