"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modals from "./Modals";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { CountrySelectValue } from "@/app/types";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import CountrySelect from "../Input/CountrySelect";
import Calandar from "../Input/Calandar";
import Counter from "../Input/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const param = useSearchParams();
  const search = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) return onNext();
    let CurrentQuery = {};
    if (param) {
      CurrentQuery = qs.parse(param?.toString());
    }

    const query: any = {
      ...CurrentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      query.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      query.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    search.onClose();

    router.push(url);
  }, [
    step,
    search,
    param,
    location,
    router,
    guestCount,
    bathroomCount,
    roomCount,
    dateRange,
    onNext,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) return "Search";
    return "Next";
  }, [step]);

  const secondryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined;
    return "back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latling} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calandar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Counter
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title="Guests"
          subTitle="How many guests are coming?"
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="Rooms"
          subTitle="How many rooms do you need?"
        />
        <hr />
        <Counter
          onChange={(value) => {
            setBathroomCount(value);
          }}
          value={bathroomCount}
          title="Bathrooms"
          subTitle="How many bahtrooms do you need?"
        />
      </div>
    );
  }

  return (
    <Modals
      isOpen={search.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondryLabel={secondryActionLabel}
      secondryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={search.onClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;
