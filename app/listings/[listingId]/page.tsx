import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import { ClientOnly, Empty } from "@/app/components";
import { IParamsProps } from "@/app/types";
import ListingClient from "./ListingClient";
import getReservation from "@/app/actions/getReservations";

const Listing = async ({ params }: { params: IParamsProps }) => {
  const list = await getListingById(params);
  const res = await getReservation(params);
  const user = await getCurrentUser();

  if (!list) {
    return (
      <ClientOnly>
        <Empty />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={list} user={user} reservation={res} />
    </ClientOnly>
  );
};

export default Listing;
