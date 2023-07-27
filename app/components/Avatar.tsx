"use client";
import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      src={"/images/placeholder.jpg"}
      alt="Place Holder"
      width={30}
      height={30}
      className="rounded-full"
    />
  );
};

export default Avatar;
