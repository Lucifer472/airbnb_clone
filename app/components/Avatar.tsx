"use client";
import Image from "next/image";

const Avatar = ({url}:{url?:string|null|undefined}) => {
  return (
    <Image
      src={url || "/images/placeholder.jpg"}
      alt="Place Holder"
      width={30}
      height={30}
      className="rounded-full"
    />
  );
};

export default Avatar;
