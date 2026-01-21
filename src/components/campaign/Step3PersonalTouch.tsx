import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Step3PersonalTouchProps {
  personalMessage: string;
  onPersonalMessageChange: (text: string) => void;
  senderName: string;
  onSenderNameChange: (name: string) => void;
  placeholder: string;
  onBack: () => void;
  onContinue: () => void;
}

export function Step3PersonalTouch({
  personalMessage,
  onPersonalMessageChange,
  senderName,
  onSenderNameChange,
  placeholder,
  onBack,
  onContinue,
}: Step3PersonalTouchProps) {
  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-2">Step 3: Personal Touch</h2>
      <p className="text-blue-200/70 mb-6">Make your email unique and impactful</p>

      {/* Personal Message */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-blue-300 uppercase tracking-wide mb-3">
          Your Personal Message
          <span className="text-white/40 font-normal normal-case ml-2">(optional but recommended)</span>
        </h3>
        <textarea
          value={personalMessage}
          onChange={(e) => onPersonalMessageChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500 text-sm leading-relaxed"
          rows={6}
        />
        <p className="text-xs text-white/40 mt-2">
          Adding a personal message makes your email stand out and shows the MEP that a real person is writing.
        </p>
      </div>

      <hr className="border-white/10 my-6" />

      {/* Sender Name */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-blue-300 uppercase tracking-wide mb-3">Your Name</h3>
        <input
          type="text"
          value={senderName}
          onChange={(e) => onSenderNameChange(e.target.value)}
          placeholder="Enter your name..."
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-colors"
        >
          <ChevronLeft size={18} />
          Back
        </button>
        <button
          onClick={onContinue}
          disabled={!senderName.trim()}
          className={`
            flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
            ${senderName.trim()
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
            }
          `}
        >
          Continue to Step 4
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
