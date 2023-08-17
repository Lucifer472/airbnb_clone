"use client";

import { categories } from "@/app/Constant";
import {
  Container,
  ListHead,
  ListInfo,
  ListingReservation,
} from "@/app/components";
import useLoginModal from "@/app/hooks/useLoginModal";
import { IListClientProps } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ListingClient: React.FC<IListClientProps> = ({
  listing,
  user,
  reservation = [],
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDate = useMemo(() => {
    let dates: Date[] = [];

    reservation.forEach((r: any) => {
      const range = eachDayOfInterval({
        start: new Date(r.startDate),
        end: new Date(r.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservation]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!user) return loginModal.onOpen();
    setIsLoading(true);

    axios
      .post("/api/res", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing has been Reserved");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch((err) => {
        toast.error("something Went Wrong");
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, [totalPrice, dateRange, listing.id, router, user, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return categories.find((i) => i.label === listing?.category);
  }, [listing?.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListHead
            title={listing.title}
            src={listing.imageSrc}
            location={listing.locationValue}
            id={listing.id}
            user={user}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListInfo
              user={listing.user}
              category={category}
              desc={listing.description}
              room={listing.roomCount}
              guest={listing.guestCount}
              bathroom={listing.bathroomCount}
              loc={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabledDate={disabledDate}
                disable={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
