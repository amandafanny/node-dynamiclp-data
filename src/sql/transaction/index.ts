import pool from "../../pool";

export const createTransactionsTableQuery = `
  CREATE TABLE IF NOT EXISTS transactions (
    transaction_hash VARCHAR(66) PRIMARY KEY,
    block_time TIMESTAMP,
    block_number BIGINT,
    value DECIMAL,
    gas_limit DECIMAL,
    gas_price DECIMAL,
    gas_used DECIMAL,
    max_fee_per_gas DECIMAL,
    max_priority_fee_per_gas DECIMAL,
    priority_fee_per_gas DECIMAL,
    nonce DECIMAL,
    \`index\` DECIMAL,
    success TINYINT(1),
    \`from\` VARCHAR(42),
    \`to\` VARCHAR(42),
    block_hash VARCHAR(66),
    \`data\` LONGBLOB,
    \`type\` LONGTEXT,
    access_list LONGTEXT,
    effective_gas_price DECIMAL,
    gas_used_for_l1 DECIMAL,
    l1_gas_used DECIMAL,
    l1_gas_price DECIMAL,
    l1_fee DECIMAL,
    l1_fee_scalar DECIMAL,
    l1_block_number DECIMAL,
    l1_timestamp DECIMAL,
    l1_tx_origin DECIMAL
  )
`;

export const TransactionType = {
  0: "Legacy",
  1: "Access List",
  2: "EIP-1559 Base",
  3: "EIP-2930",
  4: "EIP-1559",
  5: "Reserved",
};

interface TransactionRecord {
  transaction_hash: `0x${string}` | null;
  // block_time: number;
  block_number: number | null;
  value: bigint;
  gas_limit: bigint;
  gas_price: bigint;
  gas_used?: number;
  max_fee_per_gas: bigint | null;
  max_priority_fee_per_gas: bigint | null;
  priority_fee_per_gas?: bigint | null;
  nonce: number;
  index: number;
  // success: TINYINT(1), //  success (i.e. 1) or a revert (i.e. 0)
  from: `0x${string}`;
  to: `0x${string}` | null;
  block_hash: `0x${string}`;
  data: string;
  type: string; // 0 for legacy transactions types
  access_list: { address: string; storageKeys: Array<string> }[] | null;
  effective_gas_price?: number;
  gas_used_for_l1?: number;
  l1_gas_used?: bigint;
  l1_gas_price?: bigint;
  l1_fee?: bigint;
  l1_fee_scalar?: bigint;
  l1_block_number?: bigint;
  l1_timestamp?: bigint;
  l1_tx_origin?: bigint;
}

export const insertTransaction = async (obj: TransactionRecord) => {
  const insertTransaction = `
  INSERT INTO transactions (transaction_hash, block_number, value, gas_limit, gas_price, gas_used, max_fee_per_gas, max_priority_fee_per_gas, priority_fee_per_gas, nonce, \`index\`, \`from\`, \`to\`, block_hash, data, type, access_list, effective_gas_price, gas_used_for_l1, l1_gas_used, l1_fee, l1_fee_scalar, l1_block_number, l1_timestamp, l1_tx_origin)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    block_number = VALUES(block_number),
    value = VALUES(value),
    gas_limit = VALUES(gas_limit),
    gas_price = VALUES(gas_price),
    gas_used = VALUES(gas_used),
    max_fee_per_gas = VALUES(max_fee_per_gas),
    max_priority_fee_per_gas = VALUES(max_priority_fee_per_gas),
    priority_fee_per_gas = VALUES(priority_fee_per_gas),
    nonce = VALUES(nonce),
    \`index\` = VALUES(\`index\`),
    \`from\` = VALUES(\`from\`),
    \`to\` = VALUES(\`to\`),
    block_hash = VALUES(block_hash),
    data = VALUES(data),
    type = VALUES(type),
    access_list = VALUES(access_list),
    effective_gas_price = VALUES(effective_gas_price),
    gas_used_for_l1 = VALUES(gas_used_for_l1),
    l1_gas_used = VALUES(l1_gas_used),
    l1_fee = VALUES(l1_fee),
    l1_fee_scalar = VALUES(l1_fee_scalar),
    l1_block_number = VALUES(l1_block_number),
    l1_timestamp = VALUES(l1_timestamp),
    l1_tx_origin = VALUES(l1_tx_origin);
`;

  const accessListString = JSON.stringify(obj.access_list);

  const values = [
    obj.transaction_hash,
    obj.block_number,
    obj.value.toString(),
    obj.gas_limit.toString(),
    obj.gas_price.toString(),
    obj.gas_used,
    obj.max_fee_per_gas?.toString(),
    obj.max_priority_fee_per_gas?.toString(),
    obj.priority_fee_per_gas?.toString(),
    obj.nonce,
    obj.index,
    obj.from,
    obj.to,
    obj.block_hash,
    obj.data,
    obj.type,
    accessListString,
    obj.effective_gas_price,
    obj.gas_used_for_l1,
    obj.l1_gas_used?.toString(),
    obj.l1_fee?.toString(),
    obj.l1_fee_scalar?.toString(),
    obj.l1_block_number?.toString(),
    obj.l1_timestamp?.toString(),
    obj.l1_tx_origin?.toString(),
  ];
  console.log("insertTransaction", insertTransaction);

  const re = await (await pool).query(insertTransaction, values);
  console.log(re);
};
