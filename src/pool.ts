import mysql from "promise-mysql";

export default (async () => {
  const pool = await mysql.createPool({
    host: "173.254.236.116",
    user: "admin",
    password: "3NBZ8ynKdHHa@",
    database: "hub_goerli",
    connectionLimit: 10,
    connectTimeout: 30000,
  });
  return pool;
})();
