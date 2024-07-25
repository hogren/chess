import mysql from 'mysql2/promise';

class DataBase {
  static connection: mysql.Connection | null = null;

  private constructor() { }

  public static async execute(query: string, params: Object | Array<string | number | boolean>) {
    if (null === DataBase.connection) {
      DataBase.connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
      });
    }

    return DataBase.connection.execute(query, params);
  }

  public static async releaseConnection() {
    if (null !== DataBase.connection) {
      DataBase.connection.destroy();
      DataBase.connection = null;
    }
  }
}

export default DataBase;
