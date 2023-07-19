import { PassItem } from "../../data/pass";
import pool from "../../pool";

export const createPassTableQuery = `
CREATE TABLE IF NOT EXISTS pass (
  tokenId INT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  owner VARCHAR(42),
  tokenURIData LONGTEXT,
  metaIdentityAddress VARCHAR(42)
)
`;

export const insertOrUpdatePass = async (obj: PassItem) => {
  const insertOrUpdatePass = `
  INSERT INTO pass (tokenId, name, owner, tokenURIData, metaIdentityAddress)
  VALUES (?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  owner = VALUES(owner),
  tokenURIData = VALUES(tokenURIData),
  metaIdentityAddress = VALUES(metaIdentityAddress);
`;

  const re = await (
    await pool
  ).query(insertOrUpdatePass, [
    obj.tokenId,
    obj.name,
    obj.owner,
    obj.tokenURIData,
    obj.metaIdentityAddress,
  ]);

  console.log(re);
};

export const getPass = async (obj: any) => {
  const { tokenId, owner, name, metaIdentityAddress } = obj;
  const connection = await pool;
  let state = "SELECT * FROM pass WHERE 1=1";
  if (tokenId) {
    state += ` AND tokenId = ${Number(tokenId)}`;
  }

  if (owner) {
    state += ` AND owner = '${owner}'`;
  }

  if (name) {
    state += ` AND name = '${name}'`;
  }

  if (metaIdentityAddress) {
    state += ` AND metaIdentityAddress = '${metaIdentityAddress}'`;
  }

  const data = await connection.query(state);
};
