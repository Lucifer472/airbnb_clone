import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { IParamsProps } from "@/app/types";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: IParamsProps }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: user.id,
    },
  });

  return NextResponse.json(listing);
}
