import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservations";
import { ClientOnly, Empty } from "../components";
import ResClient from "./ResClient";

const ResPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <ClientOnly>
        <Empty title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    );
  }
  const res = await getReservation({
    authorId: user.id,
  });

  if (res.length === 0) {
    return (
      <ClientOnly>
        <Empty
          title="No Reservation found"
          subtitle="it Looks like you have no Reservation with us"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ResClient res={res} user={user} />
    </ClientOnly>
  );
};

export default ResPage;
