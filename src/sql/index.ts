import { createLogsTableQuery } from "./log";
import { createPassTableQuery } from "./pass";
import { createTracesTableQuery } from "./trace";
import { createTransactionsTableQuery } from "./transaction";
import { createBlockTableQuery } from "./block";
import { createDealTableQuery } from "./deal";
import { createLnModuleTableQuery } from "./lnModule";
import { createEconomicModuleTableQuery } from "./economicModule";
import { createMemberTableQuery } from "./member";
import pool from "../pool";

export const init = async () => {
  const connection = await (await pool).getConnection();
  const re1 = await connection.query(createPassTableQuery);
  const re2 = await connection.query(createEconomicModuleTableQuery);
  const re3 = await connection.query(createLnModuleTableQuery);
  const re4 = await connection.query(createMemberTableQuery);

  // const re2 = await connection.query(createLogsTableQuery);

  // const re3 = await connection.query(createTracesTableQuery);

  // const re4 = await connection.query(createTransactionsTableQuery);

  // const re5 = await connection.query(createBlockTableQuery);

  const re6 = await connection.query(createDealTableQuery);
  connection.release();
  console.log(re1, re2, re3, re4, re6);
};
