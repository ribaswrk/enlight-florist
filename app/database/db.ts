import mysql from "mysql2/promise";
import { GetDBSettings } from "./config";

const dbConfig = GetDBSettings();

// ✅ Create a connection pool (recommended)
const pool = mysql.createPool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  queueLimit: 0,
});

export default pool;
