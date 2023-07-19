import pool from "../../pool";

export const createBlockTableQuery = `
CREATE TABLE IF NOT EXISTS block (
  number BIGINT PRIMARY KEY,
  time TIMESTAMP,
  hash VARCHAR(66),
  parent_hash VARCHAR(66),
  gas_limit DECIMAL,
  gas_used DECIMAL,
  miner VARCHAR(42),
  difficulty DECIMAL,
  total_difficulty DECIMAL,
  nonce LONGBLOB,
  size DECIMAL,
  base_fee_per_gas DECIMAL
)
`;

interface BlockRecord {
  number: number;
  time: number;
  hash: `0x${string}`;
  parent_hash: `0x${string}`;
  gas_limit: number;
  gas_used: number;
  miner: `0x${string}`;
  difficulty: number;
  total_difficulty: number;
  nonce: string;
  size: number;
  base_fee_per_gas: number;
}

export const insertBlock = async (obj: BlockRecord) => {
  const insertBlock = `
  INSERT INTO block (number, time, hash, parent_hash, gas_limit, gas_used, miner, difficulty, total_difficulty, nonce, size, base_fee_per_gas)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    time = VALUES(time),
    hash = VALUES(hash),
    parent_hash = VALUES(parent_hash),
    gas_limit = VALUES(gas_limit),
    gas_used = VALUES(gas_used),
    miner = VALUES(miner),
    difficulty = VALUES(difficulty),
    total_difficulty = VALUES(total_difficulty),
    nonce = VALUES(nonce),
    size = VALUES(size),
    base_fee_per_gas = VALUES(base_fee_per_gas);
`;

  const values = [
    obj.number,
    obj.time,
    obj.hash,
    obj.parent_hash,
    obj.gas_limit,
    obj.gas_used,
    obj.miner,
    obj.difficulty,
    obj.total_difficulty,
    obj.nonce,
    obj.size,
    obj.base_fee_per_gas,
  ];

  const re = await (await pool).query(insertBlock, values);
  console.log(re);
};
