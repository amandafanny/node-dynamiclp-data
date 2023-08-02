import { MemberItem } from "../../data/member";
import pool from "../../pool";

export const createMemberTableQuery = `
CREATE TABLE IF NOT EXISTS lpStake (
  tokenId INT,
  owner VARCHAR(42),
  stake
)
`;

export const insertOrUpdateMember = async (obj: MemberItem) => {
  const connection = await (await pool).getConnection();
  const insertOrUpdateMember = `
    INSERT INTO member (tokenId, name, owner, tokenURIData, metaIdentityAddress, passName, burn)
    VALUES (?, ?, ?, ?, ?, ?, false)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      owner = VALUES(owner),
      tokenURIData = VALUES(tokenURIData),
      passName = VALUES(passName),
      burn = VALUES(burn);
  `;

  const re = await connection.query(insertOrUpdateMember, [
    obj.tokenId,
    obj.name,
    obj.owner,
    obj.tokenURIData,
    obj.metaIdentityAddress,
    obj.passName,
  ]);

  console.log(re);
  connection.release();
};

export const getLpStake = async (obj: any) => {
  const { owner, passName, tokenId, name, metaIdentityAddress, burn } = obj;
  const connection = await pool;
  let state = "SELECT * FROM member WHERE 1=1";
  if (owner) {
    state += ` AND owner = '${owner}'`;
  }
  if (passName) {
    state += ` AND passName = '${passName}'`;
  }

  if (tokenId) {
    state += ` AND tokenId = ${Number(tokenId)}`;
  }

  if (name) {
    state += ` AND name = '${name}'`;
  }

  if (metaIdentityAddress) {
    state += ` AND metaIdentityAddress = '${metaIdentityAddress}'`;
  }

  if (burn) {
    state += ` AND burn = ${burn}`;
  }

  const data = await connection.query(state);
  return data;
};
