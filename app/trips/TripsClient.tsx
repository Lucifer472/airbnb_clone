"use client";

import { useRouter } from "next/navigation";
import { Container, Heading, ListingCard } from "../components";
import { ITripsClient } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const TripsClient: React.FC<ITripsClient> = ({ res, user }) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeleteId(id);

      axios
        .delete(`/api/res/${id}`)
        .then(() => {
          toast.success("Reservation has been Cancelled");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err?.responese?.data?.error);
        })
        .finally(() => setDeleteId(""));
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you'hve been and where you will be!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {res.map((r) => (
          <ListingCard
            key={r.id}
            data={r.listing}
            reservation={r}
            actionId={r.id}
            onAction={onCancel}
            actionLabel="Cancel Reservation"
            disabled={deleteId === r.id}
            user={user}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
