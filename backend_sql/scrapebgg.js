import fetch from 'node-fetch';
import { HTMLElement, parse } from 'node-html-parser';

class BggScraper{
  static async searchID(ID) {
    const result = {
      id: ID,
      pl_min: 0,
      pl_max: 0,
      len_min: 0,
      len_max: 0,
      age_min: 0,
      weight: 0,
      year: 0,
      url: "",
      title_en: "",
      title_show:"",
      cover: ""
    };

    const URL = `https://boardgamegeek.com/boardgame/${ID}`;
    result.url = URL;

    try {
      const response = await fetch(URL);
      const html = await response.text();
      const root = parse(html);

      const scripts = root.querySelectorAll("script");
      let GEEKString = "";

      for (const script of scripts) {
        if (script.innerHTML.includes("GEEK.geekitemPreload")) {
          GEEKString = script.innerHTML;
          break;
        }
      }

      //console.log(GEEKString);

      const lines = GEEKString.split("\n");
      for (const line of lines) {
        if (line.includes("GEEK.geekitemPreload")) {
          GEEKString = line;
          break;
        }
      }
      //console.log(GEEKString);

      // Extract the JSON-like part
      const startIndex = GEEKString.indexOf("{");
      const endIndex = GEEKString.lastIndexOf("}");
      GEEKString = GEEKString.substring(startIndex, endIndex + 1);
      let GEEKData=JSON.parse(GEEKString);
      console.log(GEEKData.item);

      result.pl_min = GEEKData.item.minplayers || 0;
      result.pl_max = GEEKData.item.maxplayers || 0;
      result.len_min = GEEKData.item.minplaytime || 0;
      result.len_max = GEEKData.item.maxplaytime || 0;
      result.age_min = GEEKData.item.minage || 0;
      result.weight = GEEKData.item.stats.avgweight || 0;
      result.year = GEEKData.item.yearpublished || 0;
      result.title_en = GEEKData.item.name || null;
      result.cover = GEEKData.images.original || null;
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
      return null;
    }

    return result;
  }
}


export default BggScraper;
