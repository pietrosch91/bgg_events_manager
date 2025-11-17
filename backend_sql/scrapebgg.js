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
      GEEKData=JSON.parse(GEEKString);
      console.log(GEEKData);

      const keys = ["minplayers", "maxplayers", "minplaytime", "maxplaytime", "minage", "avgweight", "yearpublished"];
      const values = {};

      keys.forEach((key) => {
        const regex = new RegExp(`"${key}":(\\d+(\\.\\d+)?)`, "i");
        const match = GEEKString.match(regex);
        if (match) {
          values[key] = parseFloat(match[1]);
        }
      });

      result.pl_min = values.minplayers || 0;
      result.pl_max = values.maxplayers || 0;
      result.len_min = values.minplaytime || 0;
      result.len_max = values.maxplaytime || 0;
      result.age_min = values.minage || 0;
      result.weight = values.avgweight || 0;
      result.year = values.yearpublished || 0;


      const titleElement = root.querySelector("meta[name=title]");
      if (titleElement) {
        result.title_en = titleElement.getAttribute("content");
      }

      const coverElement = root.querySelector("link[rel=preload]:not([media])");
      if (coverElement) {
        result.cover = coverElement.getAttribute("href");
      }
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
      return null;
    }

    return result;
  }
}


export default BggScraper;
