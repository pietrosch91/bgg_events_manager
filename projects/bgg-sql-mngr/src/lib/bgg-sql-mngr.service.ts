import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BggSqlMngrrService {

  postData(url: string, data: any): any {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, false); // Synchronous request
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));

    if (xhr.status >= 200 && xhr.status < 300) {
      return JSON.parse(xhr.responseText);
    } else {
      throw new Error(`HTTP error! status: ${xhr.status}`);
    }
  }

  constructor() {

  }

  select(query: string): any {
    return this.postData('http://192.168.1.7:7777/select', { query: query });
  }

}
