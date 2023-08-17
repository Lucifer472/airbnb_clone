import { IFavoriteHook } from "@/app/types";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useFavorite = ({ listingId, user }: IFavoriteHook) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFav = useMemo(() => {
    const list = user?.favoriteIds || [];
    return list.includes(listingId);
  }, [listingId, user]);

  const toggleFav = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!user) return loginModal.onOpen();

      try {
        let request;

        if (hasFav) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Succesfull");
      } catch (error) {
        toast.error("Something Went Wrong!");
        console.log(error);
      }
    },
    [user, hasFav, listingId, loginModal, router]
  );

  return { hasFav, toggleFav };
};

export default useFavorite;
