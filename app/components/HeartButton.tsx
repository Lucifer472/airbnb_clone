"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IHeartButtonProps } from "../types";
import useFavorite from "../hooks/useFavorite";

const HeartButton: React.FC<IHeartButtonProps> = ({ user, listingId }) => {
  const { hasFav, toggleFav } = useFavorite({ listingId, user });

  return (
    <div
      onClick={toggleFav}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFav ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
