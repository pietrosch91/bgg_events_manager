export class BggInfo {
  age_min? : number;
  bgg_id? : number;
  cover? : string;
  len_max? : number;
  len_min? : number;
  pl_max? :number;
  pl_min? : number;
  title_en? : string;
  title_show? : string;
  url? : string;
  weight? : number;
  year? : number;

  constructor(data:any){
    this.age_min = data.age_min;
    this.bgg_id = data.id;
    this.cover = data.cover;
    this.len_max = data.len_max;
    this.len_min = data.len_min;
    this.pl_max = data.pl_max;
    this.pl_min = data.pl_min;
    this.title_en = data.title_en;
    this.title_show = data.title_show;
    this.url = data.url;
    this.weight = data.weight;
    this.year = data.year;
  }

  insertQuery():string{
    return `INSERT INTO BGG (id, title_en, title_show, year, pl_min, pl_max, len_min, len_max, weight, age_min, url, cover) VALUES (${this.bgg_id}, '${this.title_en}', '${this.title_show}', ${this.year}, ${this.pl_min}, ${this.pl_max}, ${this.len_min}, ${this.len_max}, ${this.weight}, ${this.age_min}, '${this.url}', '${this.cover}');`;
  }


}
