import { Injectable } from '@angular/core';
import mysql from 'mysql2/promise';

@Injectable({
  providedIn: 'root'
})
export class BggSqlMngrrService {
  private connectionConfig = {
    host: '192.168.1.7',
    user: 'java_ludo',
    password: '2wfafphwerwefasfa23742385e6',
    database: 'java_ludo',
  };

  private sqlconnection: any;

  constructor() {
    console.log("Constructor of BggRemoteSqlManagerService called");
    this.sqlconnection = mysql.createConnection(this.connectionConfig)
      .then((connection: any) => {
        console.log('Connection to the database established successfully.');
        return connection;
      })
      .catch((error: any) => {
        console.error('Error establishing connection:', error);
        throw error;
      });
    //this.executeSelectQuery("SELECT * FROM BGG");
  }

  executeSelectQuery(query: string, params: any[] = []): void {
    this.sqlconnection
      .then((connection: any) => {
        return connection.execute(query, params);
      })
      .then(([rows]: any) => {
        console.log('Query Results:', rows);
      })
      .catch((error: any) => {
        console.error('Error executing SELECT query:', error);
      });
  }
}
