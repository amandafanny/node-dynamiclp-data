import { ethers } from "ethers";
import pool from "./pool";
import { sleep } from "./utils/sleep";
import { getPass } from "./data/pass";
import { getEconomicModule } from "./data/economicModule";
import { updateDeal } from "./sql/deal";
import { getLpStake, stakeContractCreateBlock } from "./data/lpStake";
import { init } from "./sql";

// export const provider = new ethers.JsonRpcProvider(
//   "https://hub-private-rpc.mimic.coffee"
// );

export const provider = new ethers.JsonRpcProvider(
  "https://eth-goerli.g.alchemy.com/v2/wxt4mRmkJ7dSffMidEpaxcVf-hTAashX"
);

const run = async () => {
  await init();
  const deal = await (await pool).query(`SELECT * from deal`);
  await updateDeal("lp", stakeContractCreateBlock);
  console.log(deal);

  while (true) {
    const deal = await (await pool).query(`SELECT * from deal`);
    const number = await provider.getBlockNumber();
    console.log([number, deal[0]]);

    if (deal[0]?.blockNumber < number) {
      await getPass();
      await getEconomicModule();
      await updateDeal("blockNumber", number);
      await updateDeal("lp", number);
    }

    if (deal[0]?.lp < number) {
      getLpStake(number);
    }

    await sleep(1000);
  }
};

run();
