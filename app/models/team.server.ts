import type { Team } from "@prisma/client";
import { prisma } from "~/db.server";


export type { Team } from "@prisma/client";

export async function getTeamsByUserId(userId: Team["userId"]) {
  return prisma.team.findMany({ where: { userId } });
}

export async function addTeam(
  teamId: Team["teamId"],
  teamName: Team["teamName"],
  leagueId: Team["leagueId"],
  leagueName: Team["leagueName"],
  userId: Team["userId"]
) {
  return prisma.team.create({
    data: {
      teamId,
      teamName,
      leagueId,
      leagueName,
      userId,
    },
  });
}

export async function deleteTeamById(id: Team["id"]) {
  return prisma.team.delete({ where: { id } });
}
