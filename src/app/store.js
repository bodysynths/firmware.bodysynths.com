import { create } from "zustand";

export const useStore = create((set) => ({
  releases: [],
  instrument: "",
  device: null,
  firmwareBinFile: null,
  manifestationTolerant: false,
  firmwareName: "",
}));
