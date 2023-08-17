import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { IParamsProps } from "@/app/types";

export async function POST(
  request: Request,
  { params }: { params: IParamsProps }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.error();

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(user.favoriteIds || [])];

  favoriteIds.push(listingId);

  const userUpdated = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(userUpdated);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParamsProps }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.error();

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Ids");
  }
  let favoriteIds = [...(user.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const userUpdated = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(userUpdated);
}
