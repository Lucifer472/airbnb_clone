"use client";

import useCountry from "@/app/hooks/useCountry";
import { IListHeadProps } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

const ListHead: React.FC<IListHeadProps> = ({
  title,
  src,
  location,
  id,
  user,
}) => {
  const { getByValue } = useCountry();
  const loc = getByValue(location);
  return (
    <>
      <Heading title={title} subtitle={`${loc?.region}, ${loc?.label}`} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image alt="image" src={src} fill className="object-cover w-full" />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} user={user} />
        </div>
      </div>
    </>
  );
};

export default ListHead;
