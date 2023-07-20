import { MemberItem } from "../../data/member";
import pool from "../../pool";

export const createMemberTableQuery = `
CREATE TABLE IF NOT EXISTS member (
  tokenId INT,
  name VARCHAR(20) NOT NULL,
  owner VARCHAR(42),
  tokenURIData LONGTEXT,
  metaIdentityAddress VARCHAR(42),
  passName VARCHAR(20),
  burn BOOLEAN,
  PRIMARY KEY (tokenId, metaIdentityAddress)
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

export const burnMember = async (
  tokenId: number,
  metaIdentityAddress: `0x${string}`
) => {
  const burnMemberQuery = `
    UPDATE member
    SET burn = true
    WHERE tokenId = ? AND metaIdentityAddress = ?;
  `;

  const re = await (
    await pool
  ).query(burnMemberQuery, [tokenId, metaIdentityAddress]);
  console.log(re);
};

export const getMember = async (obj: any) => {
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
