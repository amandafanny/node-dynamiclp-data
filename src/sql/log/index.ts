import pool from "../../pool";

interface LogRecord {
  contract_address: `0x${string}`;
  topic1: string;
  topic2: string;
  topic3: string;
  topic4: string;
  data: string;
  tx_hash: `0x${string}`;
  block_hash: `0x${string}`;
  block_number: number;
  index: number;
  tx_index: number;
}

export const createLogsTableQuery = `
CREATE TABLE IF NOT EXISTS logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  contract_address VARCHAR(42),
  topic1 LONGBLOB,
  topic2 LONGBLOB,
  topic3 LONGBLOB,
  topic4 LONGBLOB,
  data LONGBLOB,
  tx_hash VARCHAR(66),
  block_hash VARCHAR(66),
  block_number BIGINT,
  block_time TIMESTAMP,
  \`index\` DECIMAL,
  tx_index DECIMAL,
  UNIQUE (tx_hash, \`index\`)
)
`;

export const insertLogs = async (logs: LogRecord[]) => {
  const insertLog = `
  INSERT INTO logs (contract_address, topic1, topic2, topic3, topic4, data, tx_hash, block_hash, block_number, \`index\`, tx_index)
  VALUES ?
  ON DUPLICATE KEY UPDATE
    contract_address = VALUES(contract_address),
    topic1 = VALUES(topic1),
    topic2 = VALUES(topic2),
    topic3 = VALUES(topic3),
    topic4 = VALUES(topic4),
    data = VALUES(data),
    block_hash = VALUES(block_hash),
    block_number = VALUES(block_number),
    tx_index = VALUES(tx_index)
`;

  const values = logs.map((log) => [
    log.contract_address,
    log.topic1,
    log.topic2,
    log.topic3,
    log.topic4,
    log.data,
    log.tx_hash,
    log.block_hash,
    log.block_number,
    log.index,
    log.tx_index,
  ]);

  const re = await (await pool).query(insertLog, [values]);
  console.log(re);
};
