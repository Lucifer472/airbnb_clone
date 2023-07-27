import { create } from "zustand";
import { ILoginModal } from "../types";

const useLoginModal = create<ILoginModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
