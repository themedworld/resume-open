import { useEffect } from "react";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { store, type RootState, type AppDispatch } from "Update/lib/redux/store";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "Update/lib/redux/local-storage";
import { initialResumeState, setResume } from "Update/lib/redux/resumeSlice";
import {
  initialSettings,
  setSettings,
  type Settings,
} from "Update/lib/redux/settingsSlice";
import { deepMerge } from "Update/lib/deep-merge";
import type { Resume } from "Update/lib/redux/types";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Hook to save store to local storage on store change
 */
export const useSaveStateToLocalStorageOnChange = () => {
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      saveStateToLocalStorage(store.getState());
    });
    return unsubscribe;
  }, []);
};

export const useSetInitialStore = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const state = loadStateFromLocalStorage();
    if (!state) return;
    if (state.resume) {

      const mergedResumeState = deepMerge(
        initialResumeState,
        state.resume
      ) as Resume;
      dispatch(setResume(mergedResumeState));
    }
    if (state.settings) {
      const mergedSettingsState = deepMerge(
        initialSettings,
        state.settings
      ) as Settings;
      dispatch(setSettings(mergedSettingsState));
    }
  }, []);
};
