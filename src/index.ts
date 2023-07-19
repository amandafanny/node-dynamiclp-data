import { ethers } from "ethers";
import pool from "./pool";
import { sleep } from "./utils/sleep";
import { getPass } from "./data/pass";
import { getEconomicModule } from "./data/economicModule";
import { updateDeal } from "./sql/deal";
import { init } from "./sql";

// export const provider = new ethers.JsonRpcProvider(
//   "https://hub-private-rpc.mimic.coffee"
// );

export const provider = new ethers.JsonRpcProvider(
  "https://eth-goerli.g.alchemy.com/v2/wxt4mRmkJ7dSffMidEpaxcVf-hTAashX"
);

const run = async () => {
  await init();

  while (true) {
    const complete = await (await pool).query(`SELECT blockNumber from deal`);
    const number = await provider.getBlockNumber();
    console.log([number, complete[0]?.blockNumber]);
    if (complete[0]?.blockNumber < number) {
      await getPass();
      await getEconomicModule();
      await updateDeal(number);
    }

    await sleep(1000);
  }
};

run();
