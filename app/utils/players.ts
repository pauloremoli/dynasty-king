import { Format } from "~/types/Format";
import { Player } from "~/types/Player";
import { Position } from "~/types/Position";

export const filterDataByFormat = (data: any, format: Format) => {
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
      (item.draft_year === "NA" ||
        item.draft_year === new Date().getFullYear()) &&
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

export const getPlayerValue = (player: Player, format: Format) => {
  return parseInt(
    format === Format.FORMAT_1QB ? player.value_1qb : player.value_2qb
  );
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
