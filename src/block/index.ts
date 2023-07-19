// block
// {
//   "_type": "Block",
//   "baseFeePerGas": "0",
//   "difficulty": "0",
//   "extraData": "0x",
//   "gasLimit": "30000000",
//   "gasUsed": "329518",
//   "hash": "0xc6d3bd693d0f3b08c2c1d42741e72f870272176d1b6fdc72f38f0cfdba56c5f6",
//   "miner": "0x0000000000000000000000000000000000000000",
//   "nonce": "0x0000000000000000",
//   "number": 332286,
//   "parentHash": "0xfaa7b3614e4c89952204b290e4ea528d09e5c27424ced5c7b5744f2f4ea06a00",
//   "timestamp": 1685434368,
//   "transactions": [
//       "0x2e2d4c6aace500ecd9137fe9f5ae6560e1b9071695acf1a7cac5677daa7d2f4c"
//   ]
// }

import { ethers } from "ethers";
import { getTransactions } from "../rawData/transaction";
import { getTraces } from "../rawData/trace";
import json from "../utils/json";

export const getBlock = async (
  provider: ethers.JsonRpcProvider,
  startBlockNumber: number = 0,
  endBlockNumber: number = 100
) => {
  const tx = await provider.getTransaction(
    "0x2e2d4c6aace500ecd9137fe9f5ae6560e1b9071695acf1a7cac5677daa7d2f4c"
  );
  console.log(json.jsonStringify(tx));
  try {
    const transactionList: `0x${string}`[] = [];
    for (
      let blockNumber = startBlockNumber;
      blockNumber <= endBlockNumber;
      blockNumber++
    ) {
      const block = await provider.getBlock(blockNumber);
      console.log("block", block);
      const { transactions = [] } = block!;
      transactionList.push(...(transactions as `0x${string}`[]));
      await getTransactions(provider, transactions as `0x${string}`[]);
    }
    await getTraces(
      provider,
      startBlockNumber,
      endBlockNumber,
      transactionList
    );
  } catch (error) {
    console.error("Error getting transactions:", error);
  }
};
