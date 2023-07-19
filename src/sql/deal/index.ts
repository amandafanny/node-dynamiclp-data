import pool from "../../pool";

export const createDealTableQuery = `
CREATE TABLE IF NOT EXISTS deal (
  id INT PRIMARY KEY,
  blockNumber BIGINT
)
`;

export const updateDeal = async (value: number) => {
  const query = `INSERT INTO deal (id, blockNumber)
  VALUES (1, ${value})
  ON DUPLICATE KEY UPDATE blockNumber = VALUES(blockNumber);`;
  const re = await (await pool).query(query);
  console.log(re);
};
