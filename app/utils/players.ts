import { FuturePickValue } from "./../types/CustomSettings";
import fuzzysort from "fuzzysort";
import { SelectSearchOption } from "react-select-search";
import { Format } from "~/types/Format";
import { Pick } from "~/types/Picks";
import { Position } from "~/types/Position";
import { Player } from "./../types/Player";
import { getBonusFuturePickAdjustment } from "./pick";

export const sortByDataByFormat = (data: any, format: Format) => {
  if (format == Format.FORMAT_2QB) {
    data.sort(sortFor2QB);
  } else {
    data.sort(sortFor1QB);
  }

  return data;
};

export const filterDataByRookie = (data: any) => {
  return data.filter(
    (item: any) =>
      item.draft_year === new Date().getFullYear().toString() &&
      item.pos !== "PICK"
  );
};

export const filterDataByPosition = (data: any, position: Position) => {
  if (position && position !== Position.ALL) {
    data = data.filter((item: any) => item.pos === position);
  }

  return data;
};

export const sortMethod = (a: string, b: string) => {
  const valueA = parseInt(a);
  const valueB = parseInt(b);
  return valueA > valueB ? -1 : 1;
};

export const sortFor1QB = (a: any, b: any) => {
  const valueA = a.value_1qb;
  const valueB = b.value_1qb;
  return sortMethod(valueA, valueB);
};

export const sortFor2QB = (a: any, b: any) => {
  const valueA = a.value_2qb;
  const valueB = b.value_2qb;
  return sortMethod(valueA, valueB);
};

export const getPlayerValue = (player: Player, format: Format): number => {
  return format === Format.FORMAT_1QB
    ? player?.value_1qb ?? 1
    : player?.value_2qb ?? 1;
};

export const getTag = (position: Position) => {
  const tag =
    " text-xs inline-flex items-center justify-center font-bold leading-sm uppercase py-1 w-10 rounded-full ";
  switch (position) {
    case Position.QB:
      return tag + "bg-green-200 text-green-700 ";
    case Position.RB:
      return tag + "bg-violet-200 text-violet-700 ";
    case Position.WR:
      return tag + "bg-red-200 text-red-700 ";
    case Position.TE:
      return tag + "bg-blue-200 text-blue-700 ";
    default:
      return tag + "bg-white text-gray-700 ";
  }
};

export const createReactTableColumn = (item: string) => {
  const result: any = {
    accessor: item,
  };

  switch (item) {
    case "player":
      result["Header"] = "Player";
      break;
    case "pos":
      result["Header"] = "Position";
      break;
    case "team":
      result["Header"] = "Team";
      break;
    case "age":
      result["Header"] = "Age";
      break;
    case "draft_year":
      result["Header"] = "Year drafted";
      break;
    case "ecr_1qb":
      result["Header"] = "Avg ranking 1QB";
      break;
    case "ecr_2qb":
      result["Header"] = "Avg ranking 2QB";
      break;
    case "ecr_pos":
      result["Header"] = "Position ranking";
      break;
    case "value_1qb":
      result["Header"] = "Value 1QB";
      result["sortMethod"] = sortMethod;
      result["sortInverted"] = true;
      break;
    case "value_2qb":
      result["Header"] = "Value 2QB";
      result["sortMethod"] = sortMethod;
      result["sortInverted"] = true;
      break;
    case "scrape_date":
      result["Header"] = "Last update";
      break;
    case "fp_id":
      result["Header"] = "Id";
      break;
    default:
      result["Header"] = item;
      break;
  }
  return result;
};

export const getRound = (round: number) => {
  switch (round) {
    case 1:
      return "1st";

    case 2:
      return "2nd";

    case 3:
      return "3rd";
    default:
      return round + "th";
  }
};

export const pad = (num: number, size: number): string => {
  let str = num.toString();
  while (str.length < size) str = "0" + str;
  return str;
};

export const searchPlayer = (
  playerInRoster: Player | undefined,
  players: Player[]
): { playerInRoster: Player; player: Player } | null => {
  if (!playerInRoster) return null;

  const str =
    playerInRoster.player +
    "/" +
    playerInRoster.pos +
    "/" +
    playerInRoster.team;

  const result = fuzzysort.go(str, players, { key: "str", limit: 1 });

  if (result.total === 1) {
    return { playerInRoster, player: result[0].obj };
  } else {
    const result = fuzzysort.go(playerInRoster.player, players, {
      key: "player",
      limit: 1,
    });

    if (result.total > 0) {
      return { playerInRoster, player: result[0].obj };
    } else {
      return null;
    }
  }
};

export const adjustValueToSettings = (
  players: Player[],
  pprTE: number,
  futurePickValue: FuturePickValue
): Player[] => {
  const bonusPerPremiumPPR = 10;
  return players.map((player: Player) => {
    const updatedPlayer: Player = { ...player };
    if (
      updatedPlayer.pos === Position.TE &&
      pprTE > 1 &&
      updatedPlayer.value_1qb &&
      updatedPlayer.value_2qb
    ) {
      updatedPlayer.value_1qb *= 1 + (pprTE * bonusPerPremiumPPR) / 2 / 100;
      updatedPlayer.value_2qb *= 1 + (pprTE * bonusPerPremiumPPR) / 2 / 100;
    } else if (
      updatedPlayer.pos === "PICK" &&
      !updatedPlayer.player.startsWith(new Date().getFullYear().toString()) &&
      updatedPlayer.value_1qb &&
      updatedPlayer.value_2qb
    ) {
      updatedPlayer.value_1qb *=
        1 + getBonusFuturePickAdjustment(futurePickValue) / 100;
      updatedPlayer.value_2qb *=
        1 + getBonusFuturePickAdjustment(futurePickValue) / 100;
    }
    return updatedPlayer;
  });
};

const getRoundString = (round: number): string => {
  switch (round) {
    case 1:
      return "1st";
    case 2:
      return "2nd";
    case 3:
      return "3rd";
    default:
      return round + "th";
  }
};

export const getPickStr = (pick: Pick) => {
  const currentSeasson = new Date().getFullYear();
  return pick.season === currentSeasson
    ? pick.season + " Pick " + pick.round + "." + pick.slot
    : pick.season + " " + getRoundString(pick.round);
};

export const filterPicks = (picks: Pick[], players: Player[]): Player[] => {
  let filtered: Player[] = [];

  picks.forEach((pick: Pick) => {
    const pickStr = getPickStr(pick);
    const pickAsPlayer: Player | undefined = players.find(
      (player: Player) => player.player === pickStr
    );
    if (pickAsPlayer) {
      filtered.push(pickAsPlayer);
    } else {
      filtered.push({
        player: pickStr,
        pos: "PICK",
        team: "NA",
        age: "NA",
        value_1qb: 1,
        value_2qb: 1,
        fp_id: "NA",
      });
    }
  });

  return filtered;
};

export const getSearchOptions = (
  players: Player[],
  format: Format,
  isPick: boolean = false
): SelectSearchOption[] => {
  const searchOptions: SelectSearchOption[] = sortByDataByFormat(
    players,
    format
  ).map((item: Player) => ({
    name: `${item.player} ${!isPick ? " - " + item.pos + " " + item.team : ""}`,
    value: item.player,
  }));
  return searchOptions;
};
