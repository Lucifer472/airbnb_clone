import { create } from "zustand";
import { IRegisterModal } from "../types";

const useRentModal = create<IRegisterModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentModal;
