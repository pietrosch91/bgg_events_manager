import { BggInfo } from "./bgg-info";




export interface BggLocalDb {
  BARCODES: Map<string, number>,
  BGG: Map<number,BggInfo>,
}

export const LocalDb:BggLocalDb={
  BARCODES:new Map<string, number>(),
  BGG:new Map<number,BggInfo>(),
};