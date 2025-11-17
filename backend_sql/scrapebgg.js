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

      const scriptElements = root.querySelectorAll("script");
      let geekString = "";

      for (const script of scriptElements) {
        if (script.innerHTML.includes("GEEK.geekitemPreload")) {
          geekString = script.innerHTML;
          break;
        }
      }

      const keys = ["minplayers", "maxplayers", "minplaytime", "maxplaytime", "minage", "avgweight", "yearpublished"];
      const values = { minplayers: 0, maxplayers: 0, minplaytime: 0, maxplaytime: 0, minage: 0, avgweight: 0, yearpublished: 0 };

      const regex = new RegExp(`"(${keys.join('|')})":(\\d+(\\.\\d+)?)`, 'g');
      let match;
      while ((match = regex.exec(geekString)) !== null) {
        const key = match[1]; // Correctly extract the key from the first capturing group
        const value = parseFloat(match[2]); // Extract the value from the second capturing group
        values[key] = value;
      }

      result.pl_min = values.minplayers;
      result.pl_max = values.maxplayers;
      result.len_min = values.minplaytime;
      result.len_max = values.maxplaytime;
      result.age_min = values.minage;
      result.weight = values.avgweight;
      result.year = values.yearpublished;

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
