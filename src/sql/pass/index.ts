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
