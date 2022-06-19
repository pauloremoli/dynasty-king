import { Format } from "./Format";

export enum FuturePickValue {
  VERY_LOW = 1,
  LOW = 2,
  MEDIUM = 3,
  HIGH = 4,
  VERY_HIGH = 5,
}

export interface CustomSettings {
  pprTE: number;
  format: Format;
  futurePickValue: FuturePickValue;
}
