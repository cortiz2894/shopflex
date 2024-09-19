import { create } from 'zustand';

type LoaderState = {
  isLoading: boolean;
  setLoading: (state: boolean) => void;
};

export const useLoaderStore = create<LoaderState>((set) => ({
  isLoading: true,
  setLoading: (state: boolean) => set({ isLoading: state }),
}));
