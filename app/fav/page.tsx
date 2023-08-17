import getCurrentUser from "../actions/getCurrentUser";
import getFav from "../actions/getFavourites";
import { ClientOnly, Empty } from "../components";
import FavClient from "./FavClient";

const Fav = async () => {
  const list = await getFav();
  const user = await getCurrentUser();

  if (list.length === 0) {
    return (
      <ClientOnly>
        <Empty
          title="No Favourites Found"
          subtitle="Looks like you have no favourites"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <FavClient user={user} list={list} />
    </ClientOnly>
  );
};

export default Fav;
