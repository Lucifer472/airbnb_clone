import prisma from "@/app/libs/prismadb";
import { IReservation } from "../types";

export default async function getReservation(params: IReservation) {
  try {
    const { listingId, userId, authorId } = params;

    const q: any = {};
    if (listingId) q.listingId = listingId;
    if (userId) q.userId = userId;
    if (authorId) q.listing = { userId: authorId };

    const reservation = await prisma.reservation.findMany({
      where: q,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservation = reservation.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString(),
      listing: {
        ...r.listing,
        createdAt: r.listing.createdAt.toISOString(),
      },
    }));

    return safeReservation;
  } catch (error: any) {
    throw new Error(error);
  }
}
