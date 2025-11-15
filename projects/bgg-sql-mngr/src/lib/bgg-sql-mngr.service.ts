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

  //bggripper functions
  private static charToEncode: string[] = ['!', '#', '$', '&', '\'', '(', ')', '*', '+', ',', '/', ':', ';', '=', '?', '@', '[', ']'];
  private static percEncoded: string[] = ["%21", "%23", "%24", "%26", "%27", "%28", "%29", "%2A", "%2B", "%2C", "%2F", "%3A", "%3B", "%3D", "%3F", "%40", "%5B", "%5D"];

  private static encode(input: string, match: string, replacement: string): string {
    return input.split(match).join(replacement);
  }

  private static percentEncode(input: string): string {
    let result = input;
    for (let i = 0; i < this.charToEncode.length; i++) {
      result = this.encode(result, this.charToEncode[i], this.percEncoded[i]);
    }
    return result;
  }

  async searchTitle(title: string): Promise<BggSearchResult[]> {
    const results: BggSearchResult[] = [];
    const url = `https://boardgamegeek.com/geeksearch.php?action=search&objecttype=boardgame&q=${BggSqlMngrService.percentEncode(title)}`;
    try {
      const response = await fetch(url);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const entries = Array.from(doc.querySelectorAll('div:has(> a.primary[href^="/boardgame/"])'));
      for (const entry of entries) {
        const anchor = entry.querySelector('a.primary');
        const bggId = parseInt(anchor?.getAttribute('href')?.split('/')[2] || '0', 10);
        const gameTitle = anchor?.textContent || '';
        const yearElement = entry.querySelector('span.smallerfont');
        const year = parseInt(yearElement?.textContent?.replace(/[()]/g, '') || '0', 10);
        results.push({ bgg_id:bggId, bgg_name: gameTitle, bgg_year:year });
      }
    } catch (error) {
      console.error(error);
    }
    return results;
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
