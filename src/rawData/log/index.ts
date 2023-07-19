import { ethers } from "ethers";
import contract, { contractAddressToName } from "../../contract";
import json from "../../utils/json";

// {
//   _type: "log",
//   address: "0xf953b3A269d80e3eB0F2947630Da976B896A8C5b",
//   blockHash:
//     "0x876f774d52afe27e45f61393cf20cc5b62f28215e424dfdc531ae569a7bd3cb4",
//   blockNumber: 331354,
//   data: "0x",
//   index: 3,
//   removed: false,
//   topics: [
//     "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
//     "0x0000000000000000000000000000000000000000000000000000000000000000",
//     "0x00000000000000000000000034f3fd8ed9815e9af85624ecc662e3a5afe4beca",
//     "0x000000000000000000000000000000000000000000000000000000000000003b",
//   ],
//   transactionHash:
//     "0xf047548145d96edf6ed99ab55bb2e873b11e26fbe554dd190ce12736ac31d83f",
//   transactionIndex: 0,
// };

export async function getAllEventLogs(
  provider: ethers.JsonRpcProvider,
  startBlockNumber: number = 0,
  endBlockNumber: number = 0
) {
  console.log("block:", [startBlockNumber, endBlockNumber]);
  try {
    const filter = {
      fromBlock: startBlockNumber,
      toBlock: endBlockNumber,
      address: Object.keys(contractAddressToName), // 填写感兴趣的合约地址，如果为空数组则获取所有合约的事件日志
    };

    const logs = await provider.getLogs(filter);
    console.log("logs:", logs.length);
    for (let item of logs) {
      console.log(json.jsonStringify(item));
      const e = {
        topics: item.topics as string[],
        data: item.data,
      };
      let event =
        contract[
          contractAddressToName[item.address as `0x${string}`]
        ].interface.parseLog(e);
      try {
        console.log("event", json.jsonStringify(event));
      } catch (error) {
        console.log("event", event);
      }
    }
    return logs;
  } catch (error) {
    console.error("Error getting event logs:", error);
    return [];
  }
}
