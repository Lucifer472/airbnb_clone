"use client";

import { useRouter } from "next/navigation";
import { Container, Heading, ListingCard } from "../components";
import { IFavProps } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const PropClient: React.FC<IFavProps> = ({ list, user }) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");
  const onDelete = useCallback(
    (id: string) => {
      setDeleteId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error);
        })
        .finally(() => setDeleteId(""));
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {list.map((l) => (
          <ListingCard
            key={l.id}
            data={l}
            actionId={l.id}
            onAction={onDelete}
            disabled={deleteId === l.id}
            actionLabel="Delete property"
            user={user}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropClient;
