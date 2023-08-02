import { LPStakeItem } from "../../data/lpStake";
import pool from "../../pool";

export const createLPStakeTableQuery = `
CREATE TABLE IF NOT EXISTS lpStake (
  token VARCHAR(42),
  user VARCHAR(42),
  stakeAmount DECIMAL(65, 0),
  PRIMARY KEY (token, user)
)
`;

export const insertOrUpdateLPStake = async (obj: LPStakeItem) => {
  const connection = await (await pool).getConnection();
  const insertOrUpdateLPStake = `
    INSERT INTO lpStake (token, user, stakeAmount)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE
      stakeAmount = VALUES(stakeAmount);
  `;

  const re = await connection.query(insertOrUpdateLPStake, [
    obj.token,
    obj.user,
    obj.stakeAmount,
  ]);

  console.log(re);
  connection.release();
};

export const getLpStake = async (obj: any) => {
  const { token, user, stakeAmount } = obj;
  const connection = await pool;
  let state = "SELECT * FROM lpStake WHERE 1=1";
  if (token) {
    state += ` AND token = '${token}'`;
  }
  if (user) {
    state += ` AND user = '${user}'`;
  }

  if (stakeAmount) {
    state += ` AND stakeAmount = ${stakeAmount}`;
  }

  const data = await connection.query(state);
  return data;
};
