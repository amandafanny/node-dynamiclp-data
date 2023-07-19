import { LnModuleItem } from "../../data/lnModule";
import pool from "../../pool";

export const createLnModuleTableQuery = `
CREATE TABLE IF NOT EXISTS lnModule (
  economicAddress VARCHAR(42) PRIMARY KEY,
  vaultAddress VARCHAR(42),
  tvlBalance DECIMAL(65, 0),
  tvlSymbol VARCHAR(8),
  tvlDecimals INT,
  pendingToken DECIMAL(65, 0),
  mintPrice DECIMAL(65, 0),
  mintFee DECIMAL(65, 0),
  burnFee DECIMAL(65, 0)
)
`;

export const insertOrUpdateLnModule = async (obj: LnModuleItem) => {
  const insertOrUpdateLnModule = `
  INSERT INTO lnModule (economicAddress, vaultAddress, tvlBalance, tvlSymbol, tvlDecimals, pendingToken, mintPrice, mintFee, burnFee)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
  vaultAddress = VALUES(vaultAddress),
  tvlBalance = VALUES(tvlBalance),
  tvlSymbol = VALUES(tvlSymbol),
  tvlDecimals = VALUES(tvlDecimals),
  pendingToken = VALUES(pendingToken),
  mintPrice = VALUES(mintPrice),
  mintFee = VALUES(mintFee),
  burnFee = VALUES(burnFee);
`;

  const re = await (
    await pool
  ).query(insertOrUpdateLnModule, [
    obj.economicAddress,
    obj.vaultAddress,
    obj.tvlBalance,
    obj.tvlSymbol,
    obj.tvlDecimals,
    obj.pendingToken,
    obj.mintPrice,
    obj.mintFee,
    obj.burnFee,
  ]);

  console.log(re);
};

export const getLnModule = async (obj: any) => {
  const {
    economicAddress,
    vaultAddress,
    tvlBalance,
    tvlDecimals,
    pendingToken,
    mintPrice,
    mintFee,
    burnFee,
  } = obj;
  const connection = await pool;
  let state = "SELECT * FROM lnModule WHERE 1=1";
  if (economicAddress) {
    state += ` AND economicAddress = '${economicAddress}'`;
  }
  if (vaultAddress) {
    state += ` AND vaultAddress = '${vaultAddress}'`;
  }

  if (tvlBalance) {
    state += ` AND tvlBalance = ${Number(tvlBalance)}`;
  }

  if (tvlDecimals) {
    state += ` AND tvlDecimals = ${Number(tvlDecimals)}`;
  }

  if (pendingToken) {
    state += ` AND pendingToken = ${Number(pendingToken)}`;
  }

  if (mintPrice) {
    state += ` AND mintPrice = ${Number(mintPrice)}`;
  }

  if (mintFee) {
    state += ` AND mintFee = ${Number(mintFee)}`;
  }

  if (burnFee) {
    state += ` AND burnFee = ${Number(burnFee)}`;
  }

  const data = await connection.query(state);
  return data;
};
