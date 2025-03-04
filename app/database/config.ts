export interface IDBSettings {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export const GetDBSettings = (): IDBSettings => {
  return {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "mydatabase",
  };
};
