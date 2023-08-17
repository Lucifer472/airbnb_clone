"use client";
import useCountry from "@/app/hooks/useCountry";
import { IListingCardProps } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Btn from "../Btn";

const ListingCard: React.FC<IListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionId = "",
  actionLabel,
  user,
}) => {
  const router = useRouter();
  const { getByValue } = useCountry();

  const location = getByValue(data?.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;
    return data?.price;
  }, [reservation, data?.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data?.id}`)}
      className="col-span-1 cursor-pointer group p-2 border-neutral-200 border-[1px] rounded-xl shadow-md"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            src={data?.imageSrc}
            alt="listing"
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} user={user} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data?.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light"> / Night</div>}
        </div>
        {onAction && actionLabel && (
          <Btn
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
