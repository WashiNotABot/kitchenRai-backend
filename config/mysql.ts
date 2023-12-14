import mysql from "mysql";
import config from "./config";

const params = {
  user: config.mysql.user,
  password: config.mysql.password,
  host: config.mysql.host + ":" + config.mysql.port,
  database: config.mysql.database,
};

export const Connect = async () =>
  new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection(params);
    connection.connect((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(connection);
    });
  });

export const Query = async <T>(connection: mysql.Connection, query: string) =>
  new Promise<T>((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
      connection.end();
    });
  });

export default { Connect, Query };