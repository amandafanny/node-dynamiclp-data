import { ethers } from "ethers";
import express, { Request, Response } from "express";
import json from "./utils/json";
import contract, { contractAddressToName } from "./contract";
import pool from "./pool";

const port = 8000;

// export const provider = new ethers.JsonRpcProvider(
//   "https://hub-private-rpc.mimic.coffee"
// );

export const provider = new ethers.JsonRpcProvider(
  "https://eth-goerli.g.alchemy.com/v2/wxt4mRmkJ7dSffMidEpaxcVf-hTAashX"
);

const app = express();
app.use(express.json());

app.get("/log", async (req: Request, res: Response) => {
  try {
    const filter = {
      fromBlock: Number(req.query.startBlockNumber),
      toBlock: Number(req.query.endBlockNumber),
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
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error getting event logs:", error);
    res.status(200).json(error);
  }
});

app.get("/block", async (req: Request, res: Response) => {
  const block = await provider.getBlock(Number(req.query.blockNumber));
  console.log("block", block);
  res.status(200).json(block);
});

app.get("/transaction", async (req: Request, res: Response) => {
  const tx = await provider.getTransaction(req.query.transaction as string);
  console.log("transaction", tx);
  res.status(200).json(tx);
});

app.get("/lastBlock", async (req: Request, res: Response) => {
  const number = await provider.getBlockNumber();
  console.log("number", number);
  res.status(200).json(number);
});

app.get("/getMember", async (req: Request, res: Response) => {
  const { owner, passName } = req.query;
  const connection = await pool;
  const data = await connection.query("SELECT * FROM member");
  return res.status(200).json(data);
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});
