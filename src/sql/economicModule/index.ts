import { EconomicModuleItem } from "../../data/economicModule";
import pool from "../../pool";

export const createEconomicModuleTableQuery = `
CREATE TABLE IF NOT EXISTS economicModule (
  tokenId INT PRIMARY KEY,
  state INT,
  owner VARCHAR(42),
  tokenURIData LONGTEXT,
  economicAddress VARCHAR(42),
  member INT
)
`;

export const insertOrUpdateEconomicModule = async (obj: EconomicModuleItem) => {
  const insertOrUpdateEconomicModule = `
  INSERT INTO economicModule (tokenId, state, owner, tokenURIData, economicAddress, member)
  VALUES (?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
  state = VALUES(state),
  owner = VALUES(owner),
  tokenURIData = VALUES(tokenURIData),
  economicAddress = VALUES(economicAddress),
  member = VALUES(member);
`;

  const re = await (
    await pool
  ).query(insertOrUpdateEconomicModule, [
    obj.tokenId,
    obj.state,
    obj.owner,
    obj.tokenURIData,
    obj.economicAddress,
    obj.member,
  ]);

  console.log(re);
};
