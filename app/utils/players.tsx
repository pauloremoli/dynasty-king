import { Format } from "~/models/Format";
import { Position } from "~/models/Position";

export const filterDataByFormat = (data: any, format: Format) => {
  if (format == Format.FORMAT_2QB) {
    data.sort(sortFor2QB);
  } else {
    data.sort(sortFor1QB);
  }

  return data;
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
