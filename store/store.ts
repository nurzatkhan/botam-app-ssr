import create from "zustand";
import { persist } from "zustand/middleware";
export type BabyDataType = {
  id: string
  sesion: string;
  firstname: string;
  lastname: string;
  surname?: string | null;
  is_boy: boolean;
  face_url: string;
};
interface BearState {
  data?: BabyDataType;
  set: (data: BabyDataType) => void;
}
const useBabyData = create<BearState>((set, get) => ({
  data: undefined,
  set: (data) => set({ data }),
  clear: () => set({ data: undefined }),
}));
export default useBabyData;
