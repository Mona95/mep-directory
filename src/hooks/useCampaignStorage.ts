import { useState, useEffect, useCallback, useRef } from 'react';
import type { CampaignState } from '../types/campaign';
import { initialCampaignState } from '../types/campaign';

const STORAGE_KEY_PREFIX = 'mep-campaign-';
const AUTO_SAVE_INTERVAL = 30000; // 30 seconds
const TOAST_DISPLAY_TIME = 3000; // 3 seconds
const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

interface UseCampaignStorageReturn {
  state: CampaignState;
  setState: React.Dispatch<React.SetStateAction<CampaignState>>;
  updateState: (updates: Partial<CampaignState>) => void;
  saveStatus: 'idle' | 'saving' | 'saved' | 'restored';
  lastSavedAgo: string;
  clearStorage: () => void;
  isInactive: boolean;
  resetInactivityTimer: () => void;
  hasDraft: boolean;
}

export function useCampaignStorage(campaignId: string): UseCampaignStorageReturn {
  const storageKey = `${STORAGE_KEY_PREFIX}${campaignId}`;
  const hasExistingData = useRef(false);

  // Check if there's existing data
  try {
    hasExistingData.current = !!localStorage.getItem(storageKey);
  } catch {
    hasExistingData.current = false;
  }

  // Initialize state from localStorage or default
  const [state, setState] = useState<CampaignState>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...initialCampaignState, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load campaign state:', e);
    }
    return initialCampaignState;
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'restored'>(
    hasExistingData.current ? 'restored' : 'idle'
  );
  const [lastSavedAgo, setLastSavedAgo] = useState<string>('');
  const [isInactive, setIsInactive] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const stateRef = useRef(state);
  stateRef.current = state;

  const inactivityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check if user has made any selections (has a draft worth saving)
  const hasDraft = state.selectedMep !== null ||
    state.greeting !== '' ||
    state.opening !== '' ||
    state.concerns.length > 0 ||
    state.asks.length > 0 ||
    state.personalMessage !== '' ||
    state.senderName !== '';

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    setLastActivity(Date.now());
    setIsInactive(false);

    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }

    // Only set timeout if there's a draft
    if (hasDraft) {
      inactivityTimeoutRef.current = setTimeout(() => {
        setIsInactive(true);
      }, INACTIVITY_TIMEOUT);
    }
  }, [hasDraft]);

  // Update helper - also resets inactivity
  const updateState = useCallback((updates: Partial<CampaignState>) => {
    setState(prev => ({ ...prev, ...updates }));
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // Save to localStorage
  const saveToStorage = useCallback(() => {
    setSaveStatus('saving');
    try {
      const toSave = { ...stateRef.current, lastSaved: Date.now() };
      localStorage.setItem(storageKey, JSON.stringify(toSave));
      setState(prev => ({ ...prev, lastSaved: Date.now() }));
      setSaveStatus('saved');

      // Auto-hide toast after display time
      setTimeout(() => {
        setSaveStatus('idle');
      }, TOAST_DISPLAY_TIME);
    } catch (e) {
      console.error('Failed to save campaign state:', e);
      setSaveStatus('idle');
    }
  }, [storageKey]);

  // Auto-save every 30 seconds (only if there's a draft)
  useEffect(() => {
    if (!hasDraft) return;

    const interval = setInterval(saveToStorage, AUTO_SAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [saveToStorage, hasDraft]);

  // Save before page unload
  useEffect(() => {
    const handleUnload = () => {
      if (!hasDraft) return;
      try {
        const toSave = { ...stateRef.current, lastSaved: Date.now() };
        localStorage.setItem(storageKey, JSON.stringify(toSave));
      } catch {
        // Ignore errors on unload
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [storageKey, hasDraft]);

  // Auto-hide restored status after display time
  useEffect(() => {
    if (saveStatus === 'restored') {
      const timeout = setTimeout(() => {
        setSaveStatus('idle');
      }, TOAST_DISPLAY_TIME);
      return () => clearTimeout(timeout);
    }
  }, [saveStatus]);

  // Initialize inactivity timer on mount if there's existing data
  useEffect(() => {
    if (hasExistingData.current && hasDraft) {
      resetInactivityTimer();
    }

    return () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, [hasDraft, resetInactivityTimer]);

  // Track user activity (mouse, keyboard, touch)
  useEffect(() => {
    const handleActivity = () => {
      if (hasDraft && !isInactive) {
        resetInactivityTimer();
      }
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('scroll', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [hasDraft, isInactive, resetInactivityTimer]);

  // Update "last saved ago" text
  useEffect(() => {
    const updateAgo = () => {
      if (!state.lastSaved) {
        setLastSavedAgo('');
        return;
      }
      const seconds = Math.floor((Date.now() - state.lastSaved) / 1000);
      if (seconds < 5) setLastSavedAgo('just now');
      else if (seconds < 60) setLastSavedAgo(`${seconds} seconds ago`);
      else if (seconds < 120) setLastSavedAgo('1 minute ago');
      else setLastSavedAgo(`${Math.floor(seconds / 60)} minutes ago`);
    };

    updateAgo();
    const interval = setInterval(updateAgo, 5000);
    return () => clearInterval(interval);
  }, [state.lastSaved]);

  // Clear storage
  const clearStorage = useCallback(() => {
    localStorage.removeItem(storageKey);
    setState(initialCampaignState);
    setSaveStatus('idle');
    setIsInactive(false);
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
  }, [storageKey]);

  return {
    state,
    setState,
    updateState,
    saveStatus,
    lastSavedAgo,
    clearStorage,
    isInactive,
    resetInactivityTimer,
    hasDraft,
  };
}
