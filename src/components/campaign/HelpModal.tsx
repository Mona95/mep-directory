import { X, Mail, Shield, Users, Heart } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignTitle: string;
}

export function HelpModal({ isOpen, onClose, campaignTitle }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-800 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-white/10 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">About This Campaign</h2>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* What is this */}
          <div>
            <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
              <Mail className="text-blue-400" size={20} />
              What is this?
            </h3>
            <p className="text-blue-200/80 text-sm leading-relaxed">
              This page helps you write and send advocacy emails to Members of the European Parliament (MEPs).
              The <strong>{campaignTitle}</strong> campaign focuses on urging MEPs to take stronger action
              on this critical human rights issue.
            </p>
          </div>

          {/* How it works */}
          <div>
            <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
              <Users className="text-green-400" size={20} />
              How does it work?
            </h3>
            <ol className="text-blue-200/80 text-sm leading-relaxed space-y-2 list-decimal list-inside">
              <li><strong>Choose an MEP</strong> — Select who you want to contact from the directory</li>
              <li><strong>Build your message</strong> — Pick from pre-written sections or write your own</li>
              <li><strong>Add a personal touch</strong> — Share why this matters to you</li>
              <li><strong>Copy and send</strong> — Copy the email parts and paste into your email app</li>
            </ol>
          </div>

          {/* Why this way */}
          <div>
            <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
              <Shield className="text-amber-400" size={20} />
              Why do I send it myself?
            </h3>
            <p className="text-blue-200/80 text-sm leading-relaxed">
              When you send from your own email account, your message is much more likely to reach the MEP.
              Bulk emails from automated systems often get caught in spam filters. A real email from a real
              person carries more weight and shows genuine constituent engagement.
            </p>
          </div>

          {/* Your data */}
          <div>
            <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
              <Heart className="text-red-400" size={20} />
              Is my data safe?
            </h3>
            <p className="text-blue-200/80 text-sm leading-relaxed">
              Yes! Your draft is saved only in your browser's local storage — we don't collect or store
              any personal information. When you close the browser or click "Start fresh", your data is gone.
            </p>
          </div>

          {/* Call to action */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <p className="text-blue-200 text-sm text-center">
              Every email matters. Your voice can make a difference in how the European Parliament
              responds to human rights crises around the world.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-800 border-t border-white/10 p-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
          >
            Got it, let's write an email!
          </button>
        </div>
      </div>
    </div>
  );
}
