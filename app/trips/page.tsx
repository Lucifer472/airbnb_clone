import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservations";
import { ClientOnly, Empty } from "../components";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <ClientOnly>
        <Empty title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    );
  }
  const res = await getReservation({
    userId: user.id,
  });

  if (res.length === 0) {
    return (
      <ClientOnly>
        <Empty
          title="No trips found"
          subtitle="it Looks like you have no Reservation with us"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient res={res} user={user} />
    </ClientOnly>
  );
};

export default TripsPage;
