"use client";

import useCountry from "@/app/hooks/useCountry";
import { IListInfoProps } from "@/app/types";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

const ListInfo: React.FC<IListInfoProps> = ({
  user,
  loc,
  guest,
  desc,
  bathroom,
  room,
  category,
}) => {
  const { getByValue } = useCountry();
  const cordinate = getByValue(loc);

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted By {user?.name}</div>
          <Avatar url={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light">
          <div>{guest} Guests</div>
          <div>{room} Rooms</div>
          <div>{bathroom} Bathroom</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          desc={category.description}
          label={category.label}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{desc}</div>
      <hr />
      <Map center={cordinate?.latling} />
    </div>
  );
};

export default ListInfo;
