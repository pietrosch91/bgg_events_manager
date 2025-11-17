import fetch from 'node-fetch';
import { HTMLElement, parse } from 'node-html-parser';

class BggSearcher {
  static charToEncode = ['!', '#', '$', '&', '\'', '(', ')', '*', '+', ',', '/', ':', ';', '=', '?', '@', '[', ']'];
  static percEncoded = ["%21", "%23", "%24", "%26", "%27", "%28", "%29", "%2A", "%2B", "%2C", "%2F", "%3A", "%3B", "%3D", "%3F", "%40", "%5B", "%5D"];

  static encode(input, match, replacement) {
    return input.split(match).join(replacement);
  }

  static percentEncode(input) {
    let result = input;
    for (let i = 0; i < this.charToEncode.length; i++) {
      result = this.encode(result, this.charToEncode[i], this.percEncoded[i]);
    }
    return result;
  }

  static async searchTitle(title) {
    const results = [];
    const url = `https://boardgamegeek.com/geeksearch.php?action=search&objecttype=boardgame&q=${this.percentEncode(title)}`;
    try {
      const response = await fetch(url);
      const text = await response.text();
      //console.log(text);
      const root = parse(text);
      const entries = root.querySelectorAll('div:has(> a.primary[href^="/boardgame/"])');
      for (const entry of entries) {
        const anchor = entry.querySelector('a.primary');
        const bggId = parseInt(anchor?.getAttribute('href')?.split('/')[2] || '0', 10);
        const gameTitle = anchor?.textContent || '';
        const yearElement = entry.querySelector('span.smallerfont');
        const year = parseInt(yearElement?.textContent?.replace(/[()]/g, '') || '0', 10);
        results.push({ bgg_id: bggId, bgg_name: gameTitle, bgg_year: year });
      }
    } catch (error) {
      console.log(error);
      console.error(error);
      return null;
    }
    return results;
  }
}

export default BggSearcher;
