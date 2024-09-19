import { create } from 'zustand';

type QuickAddState = {
  slug: string;
  setSlug: (slug: string) => void;
};

export const useQuickAddStore = create<QuickAddState>((set) => ({
  slug: '',
  setSlug: (slug: string) => set({ slug }),
}));
