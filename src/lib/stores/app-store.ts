import { create } from "zustand";

interface AppState {
  currentWorkspace: string;
  selectedRepoId: string | null;
  searchQuery: string;
  setCurrentWorkspace: (workspace: string) => void;
  setSelectedRepoId: (repoId: string | null) => void;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentWorkspace: "RepoPilot Team Space",
  selectedRepoId: null,
  searchQuery: "",
  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  setSelectedRepoId: (repoId) => set({ selectedRepoId: repoId }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
