import type { FaWatchlist } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getWatchlist(
  userId: FaWatchlist["userId"]
): Promise<FaWatchlist | null> {
  return prisma.faWatchlist.findUnique({ where: { userId } });
}

export async function createOrUpdatePlayers(
  userId: FaWatchlist["userId"],
  playersId: FaWatchlist["playersId"]
) {
  const watchlist = await prisma.faWatchlist.findUnique({ where: { userId } });
  if (watchlist) {
    return await prisma.faWatchlist.update({
      where: {
        userId,
      },
      data: {
        playersId,
      },
    });
  } else {
    return prisma.faWatchlist.create({
      data: {
        userId,
        playersId,
      },
    });
  }
}
