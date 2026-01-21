import { ChevronLeft, ChevronRight, Sparkles, PenLine } from 'lucide-react';
import type { MEP } from '../../types';
import type { iranCampaign } from '../../data/campaigns/iran';

interface Step2MessageBuilderProps {
  campaign: typeof iranCampaign;
  selectedMep: MEP;
  greeting: string;
  onGreetingChange: (id: string) => void;
  opening: string;
  onOpeningChange: (id: string) => void;
  customOpening: string;
  onCustomOpeningChange: (text: string) => void;
  concerns: string[];
  onConcernsChange: (ids: string[]) => void;
  customConcern: string;
  onCustomConcernChange: (text: string) => void;
  asks: string[];
  onAsksChange: (ids: string[]) => void;
  customAsk: string;
  onCustomAskChange: (text: string) => void;
  closing: string;
  onClosingChange: (id: string) => void;
  customClosing: string;
  onCustomClosingChange: (text: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

function getMepTitle(mep: MEP): string {
  const name = mep.name;
  const firstName = name.split(' ')[0];
  const femaleNames = ['Anna', 'Maria', 'Sophie', 'Hannah', 'Nathalie', 'Christine', 'Magdalena', 'Katarina', 'Mona'];
  const isFemale = femaleNames.some(fn => firstName.toLowerCase().startsWith(fn.toLowerCase()));
  return isFemale ? 'Ms.' : 'Mr.';
}

function getMepLastName(mep: MEP): string {
  const parts = mep.name.split(' ');
  return parts[parts.length - 1];
}

export function Step2MessageBuilder({
  campaign,
  selectedMep,
  greeting,
  onGreetingChange,
  opening,
  onOpeningChange,
  customOpening,
  onCustomOpeningChange,
  concerns,
  onConcernsChange,
  customConcern,
  onCustomConcernChange,
  asks,
  onAsksChange,
  customAsk,
  onCustomAskChange,
  closing,
  onClosingChange,
  customClosing,
  onCustomClosingChange,
  onBack,
  onContinue,
}: Step2MessageBuilderProps) {

  const toggleConcern = (id: string) => {
    if (concerns.includes(id)) {
      onConcernsChange(concerns.filter(c => c !== id));
    } else {
      onConcernsChange([...concerns, id]);
    }
  };

  const toggleAsk = (id: string) => {
    if (asks.includes(id)) {
      onAsksChange(asks.filter(a => a !== id));
    } else {
      onAsksChange([...asks, id]);
    }
  };

  const formatGreeting = (template: string) => {
    return template
      .replace('{title}', getMepTitle(selectedMep))
      .replace('{lastName}', getMepLastName(selectedMep));
  };

  return (
    <div className="bg-white/5 rounded-2xl p-4 md:p-6 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-2">Step 2: Build Your Message</h2>
      <p className="text-blue-200/70 mb-6 text-sm">Select options to compose your email</p>

      {/* Greeting */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-blue-300 uppercase tracking-wide mb-3">Greeting</h3>
        <div className="space-y-2">
          {campaign.greetings.map(g => (
            <label key={g.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="greeting"
                checked={greeting === g.id}
                onChange={() => onGreetingChange(g.id)}
                className="w-4 h-4 text-blue-500 bg-white/10 border-white/30 focus:ring-blue-500"
              />
              <span className={`text-sm ${greeting === g.id ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                {formatGreeting(g.template)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-white/10 my-6" />

      {/* Opening */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-blue-300 uppercase tracking-wide mb-3">Opening</h3>
        <div className="space-y-2">
          {campaign.openings.map(o => (
            <label key={o.id} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="radio"
                name="opening"
                checked={opening === o.id}
                onChange={() => onOpeningChange(o.id)}
                className="w-4 h-4 mt-0.5 text-blue-500 bg-white/10 border-white/30 focus:ring-blue-500"
              />
              <span className={`text-sm ${opening === o.id ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                {o.text}
              </span>
            </label>
          ))}
        </div>

        {/* Custom Opening - Highlighted */}
        <div className="mt-4 p-4 bg-gradient-to-r from-sky-500/20 to-blue-500/20 border border-sky-500/30 rounded-xl">
          <label className="flex items-center gap-2 cursor-pointer mb-3">
            <input
              type="radio"
              name="opening"
              checked={opening === 'custom'}
              onChange={() => onOpeningChange('custom')}
              className="w-4 h-4 text-sky-500 bg-white/10 border-white/30 focus:ring-sky-500"
            />
            <Sparkles size={16} className="text-sky-400" />
            <span className="text-sm font-medium text-sky-200">Write your own opening</span>
            <span className="text-xs text-sky-300/60">(optional)</span>
          </label>
          <textarea
            value={customOpening}
            onChange={(e) => {
              onCustomOpeningChange(e.target.value);
              if (e.target.value) onOpeningChange('custom');
            }}
            placeholder="Your unique voice makes your email stand out..."
            className="w-full p-3 bg-white/10 border border-sky-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-400 text-sm"
            rows={2}
          />
        </div>
      </div>

      <hr className="border-white/10 my-6" />

      {/* Concerns */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-blue-300 uppercase tracking-wide mb-3">Key Concerns (select all that apply)</h3>
        <div className="space-y-2">
          {campaign.concerns.map(c => (
            <label key={c.id} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={concerns.includes(c.id)}
                onChange={() => toggleConcern(c.id)}
                className="w-4 h-4 mt-0.5 text-blue-500 bg-white/10 border-white/30 rounded focus:ring-blue-500"
              />
              <span className={`text-sm ${concerns.includes(c.id) ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                {c.text}
              </span>
            </label>
          ))}
        </div>

        {/* Custom Concern - Highlighted */}
        <div className="mt-4 p-4 bg-gradient-to-r from-sky-500/20 to-blue-500/20 border border-sky-500/30 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <PenLine size={16} className="text-sky-400" />
            <span className="text-sm font-medium text-sky-200">Add your own concern</span>
            <span className="text-xs text-sky-300/60">(optional - makes your email unique!)</span>
          </div>
          <input
            type="text"
            value={customConcern}
            onChange={(e) => onCustomConcernChange(e.target.value)}
            placeholder="What concerns you most about this situation?"
            className="w-full p-3 bg-white/10 border border-sky-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-400 text-sm"
          />
        </div>
      </div>

      <hr className="border-white/10 my-6" />

      {/* Asks */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-blue-300 uppercase tracking-wide mb-3">Specific Asks (select all that apply)</h3>
        <div className="space-y-2">
          {campaign.asks.map(a => (
            <label key={a.id} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={asks.includes(a.id)}
                onChange={() => toggleAsk(a.id)}
                className="w-4 h-4 mt-0.5 text-blue-500 bg-white/10 border-white/30 rounded focus:ring-blue-500"
              />
              <span className={`text-sm ${asks.includes(a.id) ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                {a.text}
              </span>
            </label>
          ))}
        </div>

        {/* Custom Ask - Highlighted */}
        <div className="mt-4 p-4 bg-gradient-to-r from-sky-500/20 to-blue-500/20 border border-sky-500/30 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <PenLine size={16} className="text-sky-400" />
            <span className="text-sm font-medium text-sky-200">Add your own request</span>
            <span className="text-xs text-sky-300/60">(optional - what action do you want?)</span>
          </div>
          <input
            type="text"
            value={customAsk}
            onChange={(e) => onCustomAskChange(e.target.value)}
            placeholder="What specific action would you like them to take?"
            className="w-full p-3 bg-white/10 border border-sky-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-400 text-sm"
          />
        </div>
      </div>

      <hr className="border-white/10 my-6" />

      {/* Closing */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-blue-300 uppercase tracking-wide mb-3">Closing</h3>
        <div className="space-y-2">
          {campaign.closings.map(c => (
            <label key={c.id} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="radio"
                name="closing"
                checked={closing === c.id}
                onChange={() => onClosingChange(c.id)}
                className="w-4 h-4 mt-0.5 text-blue-500 bg-white/10 border-white/30 focus:ring-blue-500"
              />
              <span className={`text-sm ${closing === c.id ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                {c.text}
              </span>
            </label>
          ))}
        </div>

        {/* Custom Closing - Highlighted */}
        <div className="mt-4 p-4 bg-gradient-to-r from-sky-500/20 to-blue-500/20 border border-sky-500/30 rounded-xl">
          <label className="flex items-center gap-2 cursor-pointer mb-3">
            <input
              type="radio"
              name="closing"
              checked={closing === 'custom'}
              onChange={() => onClosingChange('custom')}
              className="w-4 h-4 text-sky-500 bg-white/10 border-white/30 focus:ring-sky-500"
            />
            <Sparkles size={16} className="text-sky-400" />
            <span className="text-sm font-medium text-sky-200">Write your own closing</span>
            <span className="text-xs text-sky-300/60">(optional)</span>
          </label>
          <textarea
            value={customClosing}
            onChange={(e) => {
              onCustomClosingChange(e.target.value);
              if (e.target.value) onClosingChange('custom');
            }}
            placeholder="End with your own powerful message..."
            className="w-full p-3 bg-white/10 border border-sky-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-400 text-sm"
            rows={2}
          />
        </div>
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
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all"
        >
          Continue to Step 3
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
