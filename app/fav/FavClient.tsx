"use client";

import { Container, Heading, ListingCard } from "../components";
import { IFavProps } from "../types";

const FavClient: React.FC<IFavProps> = ({ user, list }) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of all place you have favourited"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {list.map((l) => (
          <ListingCard key={l.id} data={l} user={user} />
        ))}
      </div>
    </Container>
  );
};

export default FavClient;
