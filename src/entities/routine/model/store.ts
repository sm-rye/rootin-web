import { create } from 'zustand';

import type { Routine } from './types';
import { getAllRoutines } from '../api';

interface RoutinesState {
  count: number;
  routines: Routine[];
}

interface RoutinesAction {
  fetchRoutines: () => void;
}

export const useRoutinesStore = create<RoutinesState & RoutinesAction>(
  (set) => ({
    count: 0,
    routines: [],
    fetchRoutines: async () => {
      try {
        const res = await getAllRoutines();
        console.log(res);
        set({ routines: [] });
      } catch (err) {
        console.error(err);
      }
    },
  }),
);
