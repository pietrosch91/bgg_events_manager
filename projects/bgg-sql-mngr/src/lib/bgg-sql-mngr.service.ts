import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BggSqlMngrrService {

  private async postData(url: string, data: any): Promise<any> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: "Pippo"
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  constructor() {

  }

  select(query: string): any {
    return this.postData('http://192.168.1.7:7777/select', { query: query });
  }

}
