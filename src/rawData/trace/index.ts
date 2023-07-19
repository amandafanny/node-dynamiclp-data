import { ethers } from "ethers";
import json from "../../utils/json";
// 0x2e2d4c6aace500ecd9137fe9f5ae6560e1b9071695acf1a7cac5677daa7d2f4c
// {
//   failed: false,
//   gas: "0x5072e",
//   returnValue:
//     "0x000000000000000000000000000000000000000000000000000000000000003c",
//   structLogs: [],
// };
export const getTraces = async (
  provider: ethers.JsonRpcProvider,
  startBlockNumber: number = 0,
  endBlockNumber: number = 100,
  transactionHashes: `0x${string}`[]
) => {
  try {
    const traces = [];

    for (
      let blockNumber = startBlockNumber;
      blockNumber <= endBlockNumber;
      blockNumber++
    ) {
      for (const txHash of transactionHashes) {
        const traceParams = [txHash, {}];
        const response = await provider.send(
          "debug_traceTransaction",
          traceParams
        );
        console.log(json.jsonStringify(response));
        traces.push(response);
      }
    }

    console.log("Traces:", traces);
  } catch (error) {
    console.error("Error getting traces:", error);
  }
};
