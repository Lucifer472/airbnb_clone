import getCurrentUser from "../actions/getCurrentUser";
import getListing from "../actions/getListings";
import { ClientOnly, Empty } from "../components";
import PropClient from "./PropClient";

const PropPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <Empty title="Unauthorized" subtitle="Please login" />;
  }

  const listings = await getListing({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <Empty
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropClient list={listings} user={currentUser} />
    </ClientOnly>
  );
};

export default PropPage;
