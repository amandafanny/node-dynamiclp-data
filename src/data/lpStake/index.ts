import { provider } from "../..";
import pool from "../../pool";

export interface PassItem {
  tokenId: number;
  name: string;
  owner: `0x${string}`;
  tokenURIData?: string;
  metaIdentityAddress?: `0x${string}`;
}

export const stakeContractCreateBlock = 9411659;
const contractAddress = "0xeEB5091532f4E46C26326d71b0FDC039779C9c1b";

export const getLpStake = async (currentBlockNumber: number) => {
  try {
    // 定义一个过滤器
    const filter = {
      address: contractAddress,
      fromBlock: currentBlockNumber - 1000, // 可以根据需要调整这个值
      toBlock: currentBlockNumber - 12, // 留下12个确认数以处理孤块
    };

    const logs = await provider.getLogs(filter);
    console.log(logs);
    // insertOrUpdatePass(obj);
    // await getMember(metaIdentityAddress, name);
  } catch (error) {
    console.error("Error getting contract state:", error);
  }
};
