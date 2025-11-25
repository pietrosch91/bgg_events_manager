import { BggSearchResult } from "./bgg-interfaces";

export class httpUtils{

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

  constructor(){}

  async select(query: string): Promise<{sdata:any[]}> {
    return this.postData('http://192.168.1.7:7777/select', { query: query });
  }

  async insert(query: string): Promise<string>{
    return this.postData('http://192.168.1.7:7777/insert', { query: query });
  }

  async scrapeBgg(bggid: number): Promise<{sdata:any[]}> {
    return this.postData("http://192.168.1.7:7777/scrape", { ID: bggid });
  }

  async search_bgg_by_title(title: string): Promise<{sdata:BggSearchResult[]}> {
    return this.postData("http://192.168.1.7:7777/search", { title: title });
  }

}


export const http_utils = new httpUtils();