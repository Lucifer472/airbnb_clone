import getCurrentUser from "./actions/getCurrentUser";
import getListing from "./actions/getListings";

import { ClientOnly, Container, Empty, ListingCard } from "./components";
import { IParamsList } from "./types";

interface HomeProps {
  searchParams: IParamsList;
}
export default async function Home({ searchParams }: HomeProps) {
  const listing = await getListing(searchParams);
  const currentUser = await getCurrentUser();
  if (listing?.length === 0) {
    return (
      <ClientOnly>
        <Empty showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {listing?.map((list: any) => (
            <ListingCard user={currentUser} key={list.id} data={list} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
