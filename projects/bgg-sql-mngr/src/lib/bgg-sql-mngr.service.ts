import { Injectable } from '@angular/core';
import { BggSearchResult } from './dataclasses/bgg-interfaces';

@Injectable({
  providedIn: 'root'
})
export class BggSqlMngrService {

  private async postData(url: string, data: any): Promise<any> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  constructor() {

  }

  async select(query: string): Promise<any[]> {
    return this.postData('http://192.168.1.7:7777/select', { query: query });
  }

  async get_bgg_info_from_barcode(barcode: string): Promise<any[]> {
    return this.select("SELECT * FROM BARCODES AS c LEFT JOIN BGG AS b ON c.bgg_id = b.id WHERE c.barcode = '" + barcode + "';");
  }

  async search_bgg_by_title(title: string): Promise<BggSearchResult[]> {
    return this.postData("http://192.168.1.7:7777/search", { title: title });
  }

/*
  public static BggGameInfo search_ID(int ID){
      BggGameInfo result= new BggGameInfo();
      result.BGG_ID=ID;
      String URL="https://boardgamegeek.com/boardgame/"+ID;
      double[] values={0,0,0,0,0,0,0};
      try{
          Document d=Jsoup.connect(URL).get();
          System.out.println(d.toString());
          ArrayList<Element> scripts =Selector.select("script",d);
          Element GEEKScript=null;
          String GEEKString="";
          for(int i=0;i<scripts.size();i++){
              if(scripts.get(i).html().contains("GEEK.geekitemPreload")){
                  GEEKScript=scripts.get(i);
                  break;
              }
          }
          String[] lines=GEEKScript.html().split("\n");
          for(int i=0;i<lines.length;i++){
              if(lines[i].contains("GEEK.geekitemPreload")){
                  GEEKString=lines[i];
                  break;
              }
          }
          StringTokenizer st=new StringTokenizer(GEEKString,"\"");
          String[] keys={"minplayers","maxplayers","minplaytime","maxplaytime","minage","avgweight","yearpublished"};
          while(st.hasMoreTokens()){
              String tok=st.nextToken();
              System.out.println(tok);
              for(int i=0;i<keys.length;i++){
                  if(!tok.equals(keys[i]))  continue;
                  st.nextToken();
                  try{
                      double x=Double.parseDouble(st.nextToken());
                      values[i]=x;
                  }catch(NumberFormatException e){}
              }
          }

          result.BGG_min_players=(int)values[0];
          result.BGG_max_players=(int)values[1];
          result.BGG_min_len=(int)values[2];
          result.BGG_max_len=(int)values[3];
          result.BGG_min_age=(int)values[4];
          result.BGG_weight=values[5];
          result.BGG_yr=(int)values[6];
          result.BGG_URL=URL;

          Element title=Selector.select("meta[name=title]",d).first();
          result.BGG_Title=title.attr("content");

          Element cover=Selector.select("link[rel=preload]:not([media])",d).first();
          result.BGG_Cover=cover.attr("href");
      }catch(IOException e){}

      return result;

  }*/




}
