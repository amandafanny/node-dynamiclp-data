import pool from "../../pool";

export const createTracesTableQuery = `
CREATE TABLE IF NOT EXISTS traces (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  block_time TIMESTAMP,
  block_number BIGINT,
  value DECIMAL,
  gas DECIMAL,
  gas_used DECIMAL,
  block_hash VARCHAR(66),
  success TINYINT(1),
  tx_index DECIMAL,
  sub_traces DECIMAL,
  error LONGTEXT,
  tx_success TINYINT(1),
  tx_hash VARCHAR(66),
  \`from\` VARCHAR(42),
  \`to\` VARCHAR(42),
  trace_address LONGTEXT,
  \`type\` LONGTEXT,
  address VARCHAR(42),
  code LONGBLOB,
  call_type LONGBLOB,
  \`input\` LONGBLOB,
  \`output\` LONGBLOB,
  refund_address VARCHAR(42)
)
`;

interface TraceRecord {
  block_time: number;
  block_number: number;
  value: number;
  gas: number;
  gas_used: number;
  block_hash: `0x${string}`;
  success: boolean;
  tx_index: number;
  sub_traces: number;
  tx_hash: `0x${string}`;
  from: `0x${string}`;
  to: `0x${string}`;
  address: `0x${string}`;
  refund_address: `0x${string}`;
}

export const insertLogs = async (obj: TraceRecord) => {
  const insertLog = `
  INSERT INTO traces (block_time, block_number, value, gas, gas_used, block_hash, success, tx_index, sub_traces, tx_hash, \`from\`, \`to\`, address, refund_address)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
  block_time = VALUES(block_time),
  block_number = VALUES(block_number),
  value = VALUES(value),
  gas = VALUES(gas),
  gas_used = VALUES(gas_used),
  block_hash = VALUES(block_hash),
  success = VALUES(success),
  tx_index = VALUES(tx_index),
  sub_traces = VALUES(sub_traces),
  tx_hash = VALUES(tx_hash),
  \`from\` = VALUES(\`from\`),
  \`to\` = VALUES(\`to\`),
  address = VALUES(address),
  refund_address = VALUES(refund_address);
`;

  const values = [
    obj.block_time,
    obj.block_number,
    obj.value,
    obj.gas,
    obj.gas_used,
    obj.block_hash,
    obj.success,
    obj.tx_index,
    obj.sub_traces,
    obj.tx_hash,
    obj.from,
    obj.to,
    obj.address,
    obj.refund_address,
  ];

  const re = await (await pool).query(insertLog, values);
  console.log(re);
};
