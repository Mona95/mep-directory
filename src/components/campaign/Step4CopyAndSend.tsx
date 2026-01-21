import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Copy, Check, RotateCcw, AlertTriangle } from 'lucide-react';
import type { MEP } from '../../types';

interface Step4CopyAndSendProps {
  selectedMep: MEP;
  subject: string;
  emailBody: string;
  onBack: () => void;
  onStartFresh: () => void;
}

type CopiedField = 'email' | 'subject' | 'body' | null;

export function Step4CopyAndSend({
  selectedMep,
  subject,
  emailBody,
  onBack,
  onStartFresh,
}: Step4CopyAndSendProps) {
  const [copied, setCopied] = useState<CopiedField>(null);
  const [reminderCount, setReminderCount] = useState(0);
  const reminderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const subjectRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Show popup when reminderCount > 0
  const showReminder = reminderCount > 0;

  // Trigger the reminder popup
  const triggerReminder = () => {
    // Clear any existing timeout
    if (reminderTimeoutRef.current) {
      clearTimeout(reminderTimeoutRef.current);
    }

    // Increment to trigger/re-trigger animation
    setReminderCount(c => c + 1);

    // Auto-hide after 4 seconds
    reminderTimeoutRef.current = setTimeout(() => {
      setReminderCount(0);
    }, 4000);
  };

  // Listen for copy events on subject and body elements
  useEffect(() => {
    const subjectEl = subjectRef.current;
    const bodyEl = bodyRef.current;

    const handleCopyEvent = () => {
      triggerReminder();
    };

    subjectEl?.addEventListener('copy', handleCopyEvent);
    bodyEl?.addEventListener('copy', handleCopyEvent);

    return () => {
      subjectEl?.removeEventListener('copy', handleCopyEvent);
      bodyEl?.removeEventListener('copy', handleCopyEvent);
      if (reminderTimeoutRef.current) {
        clearTimeout(reminderTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async (text: string, field: CopiedField) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);

      // Show personalization reminder for subject or body
      if (field === 'subject' || field === 'body') {
        triggerReminder();
      }

      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white/5 rounded-2xl p-4 md:p-6 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-2">Step 4: Copy & Send</h2>
      <p className="text-blue-200/70 mb-6 text-sm md:text-base">
        Copy each part and paste into your email app (Gmail, Outlook, Apple Mail, etc.)
      </p>

      {/* Personalization Reminder Popup */}
      {showReminder && (
        <div key={reminderCount} className="mb-4 p-3 bg-amber-500/20 border border-amber-500/30 rounded-xl animate-pulse">
          <div className="flex items-start gap-2">
            <AlertTriangle className="text-amber-400 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-amber-200 text-sm font-medium">
                Personalize before sending!
              </p>
              <p className="text-amber-200/70 text-xs mt-1">
                Add a personal touch to help your email avoid spam filters and make a stronger impact.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Email To */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-300 uppercase tracking-wide">To:</span>
          <button
            onClick={() => handleCopy(selectedMep.email, 'email')}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
              ${copied === 'email'
                ? 'bg-green-500/20 text-green-300'
                : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
              }
            `}
          >
            {copied === 'email' ? <Check size={16} /> : <Copy size={16} />}
            {copied === 'email' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="p-3 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-xs md:text-sm break-all">
          {selectedMep.email}
        </div>
      </div>

      {/* Subject */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-300 uppercase tracking-wide">Subject:</span>
          <button
            onClick={() => handleCopy(subject, 'subject')}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
              ${copied === 'subject'
                ? 'bg-green-500/20 text-green-300'
                : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
              }
            `}
          >
            {copied === 'subject' ? <Check size={16} /> : <Copy size={16} />}
            {copied === 'subject' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div
          ref={subjectRef}
          className="p-3 bg-white/10 border border-white/20 rounded-lg text-white text-sm select-all cursor-text"
        >
          {subject}
        </div>
      </div>

      {/* Email Body */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-300 uppercase tracking-wide">Email Body:</span>
          <button
            onClick={() => handleCopy(emailBody, 'body')}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
              ${copied === 'body'
                ? 'bg-green-500/20 text-green-300'
                : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
              }
            `}
          >
            {copied === 'body' ? <Check size={16} /> : <Copy size={16} />}
            {copied === 'body' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div
          ref={bodyRef}
          className="p-4 bg-white/10 border border-white/20 rounded-lg text-white text-sm whitespace-pre-wrap max-h-64 md:max-h-80 overflow-y-auto leading-relaxed select-all cursor-text"
        >
          {emailBody}
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
        <h4 className="text-green-300 font-medium mb-2 text-sm">How to send:</h4>
        <ol className="text-green-200/80 text-xs md:text-sm space-y-1 list-decimal list-inside">
          <li>Open your email app (Gmail, Outlook, etc.)</li>
          <li>Create a new email</li>
          <li>Copy and paste the <strong>To</strong> address</li>
          <li>Copy and paste the <strong>Subject</strong></li>
          <li>Copy and paste the <strong>Email Body</strong></li>
          <li>Review, make any final edits, and hit Send!</li>
        </ol>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-colors"
        >
          <ChevronLeft size={18} />
          Back to edit
        </button>
        <button
          onClick={onStartFresh}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all"
        >
          <RotateCcw size={18} />
          Start fresh (new MEP)
        </button>
      </div>
    </div>
  );
}
