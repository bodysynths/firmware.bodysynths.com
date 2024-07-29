import { create } from "zustand";

export const useStore = create((set) => ({
  device: null,
  firmwareBinFile: null,
  manifestationTolerant: false,
}));
