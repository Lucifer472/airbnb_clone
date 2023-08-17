import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFav() {
  try {
    const user = await getCurrentUser();
    if (!user) return [];

    const fav = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(user.favoriteIds || [])],
        },
      },
    });

    const safeFav = fav.map((f) => ({
      ...f,
      createdAt: f.createdAt.toISOString(),
    }));

    return safeFav;
  } catch (error: any) {
    throw new Error(error);
  }
}
