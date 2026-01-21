import { useRef, useEffect, useState } from 'react';
import { useMeps } from '../hooks/useMeps';
import { useCampaignStorage } from '../hooks/useCampaignStorage';
import { iranCampaign } from '../data/campaigns/iran';
import { StepTracker } from '../components/campaign/StepTracker';
import { SaveToast } from '../components/campaign/SaveToast';
import { HelpModal } from '../components/campaign/HelpModal';
import { InactivityPrompt } from '../components/campaign/InactivityPrompt';
import { Step1MEPSelector } from '../components/campaign/Step1MEPSelector';
import { Step2MessageBuilder } from '../components/campaign/Step2MessageBuilder';
import { Step3PersonalTouch } from '../components/campaign/Step3PersonalTouch';
import { Step4CopyAndSend } from '../components/campaign/Step4CopyAndSend';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import type { MEP } from '../types';

function getMepTitle(mep: MEP): string {
  const name = mep.name;
  const firstName = name.split(' ')[0];
  const femaleNames = ['Anna', 'Maria', 'Sophie', 'Hannah', 'Nathalie', 'Christine', 'Magdalena', 'Katarina', 'Mona', 'Anja', 'Renate', 'Sabine', 'Heidi'];
  const isFemale = femaleNames.some(fn => firstName.toLowerCase().startsWith(fn.toLowerCase()));
  return isFemale ? 'Ms.' : 'Mr.';
}

function getMepLastName(mep: MEP): string {
  const parts = mep.name.split(' ');
  return parts[parts.length - 1];
}

export function IranCampaignPage() {
  const { data: meps, loading, error, refetch } = useMeps();
  const { state, updateState, saveStatus, lastSavedAgo, clearStorage, isInactive, resetInactivityTimer } = useCampaignStorage('iran');
  const [showHelp, setShowHelp] = useState(false);

  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  // Initialize random indices on first load
  useEffect(() => {
    if (state.templateIndex === null || state.subjectIndex === null) {
      updateState({
        templateIndex: Math.floor(Math.random() * iranCampaign.bodyTemplates.length),
        subjectIndex: Math.floor(Math.random() * iranCampaign.subjects.length),
      });
    }
  }, [state.templateIndex, state.subjectIndex, updateState]);

  const scrollToStep = (step: number) => {
    const refs = [step1Ref, step2Ref, step3Ref, step4Ref];
    refs[step - 1]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goToStep = (step: number) => {
    updateState({ currentStep: step });
    setTimeout(() => scrollToStep(step), 100);
  };

  // Get the randomly assigned subject
  const getSubject = (): string => {
    const index = state.subjectIndex ?? 0;
    return iranCampaign.subjects[index];
  };

  // Generate email body using template
  const generateEmailBody = (): string => {
    if (!state.selectedMep) return '';

    const templateIndex = state.templateIndex ?? 0;
    let template = iranCampaign.bodyTemplates[templateIndex];

    // Get greeting
    const greetingTemplate = iranCampaign.greetings.find(g => g.id === state.greeting)?.template || 'Dear Sir/Madam,';
    const greeting = greetingTemplate
      .replace('{title}', getMepTitle(state.selectedMep))
      .replace('{lastName}', getMepLastName(state.selectedMep));

    // Get opening
    let opening = '';
    if (state.opening === 'custom' && state.customOpening) {
      opening = state.customOpening;
    } else {
      opening = iranCampaign.openings.find(o => o.id === state.opening)?.text || '';
    }

    // Get concerns
    const selectedConcerns = iranCampaign.concerns.filter(c => state.concerns.includes(c.id));
    const allConcerns = [...selectedConcerns.map(c => c.text)];
    if (state.customConcern) allConcerns.push(state.customConcern);

    const concernsBullets = allConcerns.map(c => `• ${c}`).join('\n');
    const concernsParagraph = allConcerns.join(' Furthermore, ');
    const concernFirst = allConcerns[0]?.toLowerCase() || 'human rights violations continue unchecked';

    // Get asks
    const selectedAsks = iranCampaign.asks.filter(a => state.asks.includes(a.id));
    const allAsks = [...selectedAsks.map(a => a.text)];
    if (state.customAsk) allAsks.push(state.customAsk);

    const asksBullets = allAsks.map(a => `• ${a}`).join('\n');
    const asksParagraph = allAsks.join(' Additionally, ');

    // Get closing
    let closing = '';
    if (state.closing === 'custom' && state.customClosing) {
      closing = state.customClosing;
    } else {
      closing = iranCampaign.closings.find(c => c.id === state.closing)?.text || '';
    }

    // Personal message
    const personal = state.personalMessage || '';

    // Name
    const name = state.senderName || '[Your name]';

    // Replace placeholders
    let body = template
      .replace('{greeting}', greeting)
      .replace('{opening}', opening)
      .replace('{concerns}', concernsBullets)
      .replace('{concernsParagraph}', concernsParagraph)
      .replace('{concernFirst}', concernFirst)
      .replace('{asks}', asksBullets)
      .replace('{asksParagraph}', asksParagraph)
      .replace('{personal}', personal)
      .replace('{closing}', closing)
      .replace('{name}', name);

    // Clean up empty lines (if personal message is empty, etc.)
    body = body.replace(/\n\n\n+/g, '\n\n').trim();

    return body;
  };

  const handleStartFresh = () => {
    if (window.confirm('This will clear your current draft. Are you sure?')) {
      clearStorage();
      // Assign new random indices
      updateState({
        templateIndex: Math.floor(Math.random() * iranCampaign.bodyTemplates.length),
        subjectIndex: Math.floor(Math.random() * iranCampaign.subjects.length),
      });
      goToStep(1);
    }
  };

  const handleContinueDraft = () => {
    resetInactivityTimer();
  };

  const handleResetFromInactivity = () => {
    clearStorage();
    updateState({
      templateIndex: Math.floor(Math.random() * iranCampaign.bodyTemplates.length),
      subjectIndex: Math.floor(Math.random() * iranCampaign.subjects.length),
    });
    goToStep(1);
  };

  // Auto-scroll on step change
  useEffect(() => {
    scrollToStep(state.currentStep);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="p-4 md:p-8 pb-0">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {iranCampaign.title}
          </h1>
          <p className="text-blue-200/70">
            {iranCampaign.subtitle}
          </p>
        </div>

        {/* Step Tracker */}
        <StepTracker
          currentStep={state.currentStep}
          onStepClick={goToStep}
          onClear={handleStartFresh}
          onHelpClick={() => setShowHelp(true)}
        />

        {/* Help Modal */}
        <HelpModal
          isOpen={showHelp}
          onClose={() => setShowHelp(false)}
          campaignTitle={iranCampaign.title}
        />

        {/* Save Toast - bottom left */}
        <SaveToast status={saveStatus} lastSavedAgo={lastSavedAgo} />

        {/* Inactivity Prompt */}
        <InactivityPrompt
          isOpen={isInactive}
          onContinue={handleContinueDraft}
          onReset={handleResetFromInactivity}
        />

        {/* Content */}
        <div className="p-4 md:p-8 pt-0 space-y-6">
          {loading && <LoadingState />}

          {error && !loading && (
            <ErrorState message={error} onRetry={refetch} />
          )}

          {meps && !loading && !error && (
            <>
              {/* Step 1 */}
              <div ref={step1Ref}>
                {state.currentStep >= 1 && (
                  <Step1MEPSelector
                    meps={meps}
                    selectedMep={state.selectedMep}
                    onSelectMep={(mep) => updateState({ selectedMep: mep })}
                    onContinue={() => goToStep(2)}
                  />
                )}
              </div>

              {/* Step 2 */}
              <div ref={step2Ref}>
                {state.currentStep >= 2 && state.selectedMep && (
                  <Step2MessageBuilder
                    campaign={iranCampaign}
                    selectedMep={state.selectedMep}
                    greeting={state.greeting}
                    onGreetingChange={(id) => updateState({ greeting: id })}
                    opening={state.opening}
                    onOpeningChange={(id) => updateState({ opening: id })}
                    customOpening={state.customOpening}
                    onCustomOpeningChange={(text) => updateState({ customOpening: text })}
                    concerns={state.concerns}
                    onConcernsChange={(ids) => updateState({ concerns: ids })}
                    customConcern={state.customConcern}
                    onCustomConcernChange={(text) => updateState({ customConcern: text })}
                    asks={state.asks}
                    onAsksChange={(ids) => updateState({ asks: ids })}
                    customAsk={state.customAsk}
                    onCustomAskChange={(text) => updateState({ customAsk: text })}
                    closing={state.closing}
                    onClosingChange={(id) => updateState({ closing: id })}
                    customClosing={state.customClosing}
                    onCustomClosingChange={(text) => updateState({ customClosing: text })}
                    onBack={() => goToStep(1)}
                    onContinue={() => goToStep(3)}
                  />
                )}
              </div>

              {/* Step 3 */}
              <div ref={step3Ref}>
                {state.currentStep >= 3 && state.selectedMep && (
                  <Step3PersonalTouch
                    personalMessage={state.personalMessage}
                    onPersonalMessageChange={(text) => updateState({ personalMessage: text })}
                    senderName={state.senderName}
                    onSenderNameChange={(name) => updateState({ senderName: name })}
                    placeholder={iranCampaign.personalMessagePlaceholder}
                    onBack={() => goToStep(2)}
                    onContinue={() => goToStep(4)}
                  />
                )}
              </div>

              {/* Step 4 */}
              <div ref={step4Ref}>
                {state.currentStep >= 4 && state.selectedMep && (
                  <Step4CopyAndSend
                    selectedMep={state.selectedMep}
                    subject={getSubject()}
                    emailBody={generateEmailBody()}
                    onBack={() => goToStep(3)}
                    onStartFresh={handleStartFresh}
                  />
                )}
              </div>
            </>
          )}

          {/* Footer */}
          <p className="text-center text-xs text-blue-300/40 mt-8 pb-4">
            MEP data from europarl.europa.eu • Your draft is saved locally in your browser
          </p>
        </div>
      </div>
    </div>
  );
}
