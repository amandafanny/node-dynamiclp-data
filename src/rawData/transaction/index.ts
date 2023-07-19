import { ethers } from "ethers";
import { TransactionType, insertTransaction } from "../../sql/transaction";
// tx
// {
//   _type: "TransactionReceipt",
//   accessList: [],
//   blockNumber: 332286,
//   blockHash:
//     "0xc6d3bd693d0f3b08c2c1d42741e72f870272176d1b6fdc72f38f0cfdba56c5f6",
//   chainId: "12345",
//   data: "0xd85d3d27000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000056c69626169000000000000000000000000000000000000000000000000000000",
//   from: "0x34F3fD8ed9815E9aF85624eCC662E3A5AFe4bEca",
//   gasLimit: "353596",
//   gasPrice: "1500000000",
//   hash: "0x2e2d4c6aace500ecd9137fe9f5ae6560e1b9071695acf1a7cac5677daa7d2f4c",
//   maxFeePerGas: "1500000000",
//   maxPriorityFeePerGas: "1500000000",
//   nonce: 79,
//   signature: {
//     _type: "signature",
//     networkV: null,
//     r: "0xbd843439e9d4a20b75abdab57ed27d8488cdba0477aa3a0a8ce9a26d7080a7dd",
//     s: "0x54554e84c5f6144ea53f08625670fd4cb3d9b79ba8067c257b4ff6431756fcec",
//     v: 27,
//   },
//   to: "0xf953b3A269d80e3eB0F2947630Da976B896A8C5b",
//   type: 2,
//   value: "0",
// };
export const getTransactions = async (
  provider: ethers.JsonRpcProvider,
  transactions: `0x${string}`[]
) => {
  console.log("transactions", transactions.length);
  try {
    const transactionList = [];
    for (const txHash of transactions) {
      const tx = await provider.getTransaction(txHash);
      transactionList.push(tx);
    }
    console.log("Transactions:", transactionList);
    return transactionList;
  } catch (error) {
    console.error("Error getting transactions:", error);
    return [];
  }
};
