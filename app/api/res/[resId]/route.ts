import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  resId: string;
}
export async function DELETE(req: Request, { params }: { params: IParams }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.error();

  const { resId } = params;
  if (!resId || typeof resId !== "string") throw new Error("Invalid Id");

  const res = await prisma.reservation.deleteMany({
    where: {
      id: resId,
      OR: [{ userId: user.id }, { listing: { userId: user.id } }],
    },
  });

  return NextResponse.json(res);
}
