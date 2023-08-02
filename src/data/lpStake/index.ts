import { Interface } from "ethers";
import { provider } from "../..";
import { stakingContractMainnetABI } from "../../abis/staking-contract";
import { updateDeal } from "../../sql/deal";
import { insertOrUpdateLPStake } from "../../sql/lpStake";
import contract, { contractNameToAddress } from "../../contract";

export interface LPStakeItem {
  token: string;
  user: `0x${string}`;
  stakeAmount?: string;
  decimals?: `0x${string}`;
}
// transactionHash: '0xeb560108d70ab2ab523c20eaca4af1d7968511846b348cdb974888ba7673359d',
// blockHash: '0x7d43dfc6c3966edf8a428d164e0f2bf5b31ac37cca7add2b497ba1fcc6db8a95',
// blockNumber: 9420586,
// removed: false,
// address: '0xeEB5091532f4E46C26326d71b0FDC039779C9c1b',
// data: '0x000000000000000000000000000000000000000000000000000d880c4e055d13',
// topics: [
//   '0x3ed1528b0fdc7c5207c1bf935e34a667e13656b9ed165260c522be0bc544f303',
//   '0x0000000000000000000000000000000000000000000000000000000000000001',
//   '0x00000000000000000000000062641b4f9cc833da3094c6d7cdcbbc6d982a98c7'
// ],
// index: 42,
// transactionIndex: 21
export const stakeContractCreateBlock = 9411659;

export const getLpStake = async (
  startBlockNumber: number,
  currentBlockNumber: number
) => {
  const contractInterface = Interface.from(stakingContractMainnetABI);
  try {
    // 定义一个过滤器
    const filter = {
      address: contractNameToAddress.LPStake,
      fromBlock: startBlockNumber, // 可以根据需要调整这个值
      toBlock: currentBlockNumber - 12, // 留下12个确认数以处理孤块
    };

    const logs = await provider.getLogs(filter);
    for (let log of logs) {
      console.log(log);
      // @ts-ignore
      const logItem = contractInterface.parseLog(log);
      console.log(logItem);
      if (logItem?.name === "Stake") {
        // token user amount
        const [token, user] = logItem.args;
        const [stakeAmount] = await contract.LPStake.userStakes(user, token);
        insertOrUpdateLPStake({
          token,
          user,
          stakeAmount,
        });
      } else {
        console.log(logItem?.name);
      }
    }
    updateDeal("lp", currentBlockNumber - 12);
  } catch (error) {
    console.error("Error getting contract state:", error);
  }
};
