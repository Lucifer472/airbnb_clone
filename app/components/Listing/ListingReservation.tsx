"use client";

import { IListingReservation } from "@/app/types";
import Calendar from "../Input/Calandar";
import Btn from "../Btn";

const ListingReservation: React.FC<IListingReservation> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disable,
  disabledDate,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">/ Night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDate={disabledDate}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
      <div className="p-4">
        <Btn disabled={disable} label="Reserv" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default ListingReservation;
