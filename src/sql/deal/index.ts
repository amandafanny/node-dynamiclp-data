import pool from "../../pool";

export const createDealTableQuery = `
CREATE TABLE IF NOT EXISTS deal (
  id INT PRIMARY KEY,
  blockNumber BIGINT,
  lp BIGINT
)
`;

export const updateDeal = async (name: string, value: number) => {
  const query = `INSERT INTO deal (id, ${name})
  VALUES (1, ${value})
  ON DUPLICATE KEY UPDATE ${name} = VALUES(${name});`;
  const re = await (await pool).query(query);
  console.log(re);
};
