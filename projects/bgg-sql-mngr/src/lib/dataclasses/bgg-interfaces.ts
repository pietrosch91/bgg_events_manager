
export interface BggSearchResult{
    bgg_id:number,
    bgg_name:string,
    bgg_year:number
}

export interface bgg_search_status{
  barcode:string,
  bgg_id?:number,
}


export enum SourceID {
  LOCAL_DB = 0,
  REMOTE_DB = 1,
  EXT_API = 2,
}

export function getSourceName(src: SourceID): string {
  return SourceID[src] || "UNKNOWN_SOURCE";
}

export interface Option_t {
  val:any|null,
  label:string,
}
