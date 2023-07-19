import { Typed, ethers } from "ethers";
import contract from "../../contract";
import json from "../../utils/json";
import { getLnModule } from "../lnModule";
import { metaIdentityABI } from "../../abis/meta-identity";
import { provider } from "../..";
import { insertOrUpdateEconomicModule } from "../../sql/economicModule";

interface EconomicModuleTokenURIData {
  ID: string;
  description: string;
  image_data: string;
  attributes: { display_type: string; trait_type: string; value: unknown }[];
}

export interface EconomicModuleItem {
  tokenId: number;
  state: number;
  owner: `0x${string}`;
  tokenURIData?: string;
  economicAddress: `0x${string}`;
  member: number;
}

export const getEconomicModule = async () => {
  try {
    // 调用合约的视图函数或读取公共变量
    const nextTokenId = await contract.EconomicModuleHub.nextTokenId();
    const list: EconomicModuleItem[] = [];
    console.log("nextEconomicTokenId", nextTokenId);
    // contract.EconomicModuleHub.getEconomicState();

    // contract.EconomicModuleHub.getDomainSeparator()
    // contract.EconomicModuleHub.tokenIdByEconomic();
    for (let i = 1; i < nextTokenId; i++) {
      const owner = await contract.EconomicModuleHub.ownerOf(Typed.uint256(i));
      const [, state] = await contract.EconomicModuleHub.getEconomicState(
        owner
      );
      const tokenURI = await contract.EconomicModuleHub.tokenURI(
        Typed.uint256(i)
      );
      const economicAddress =
        await contract.EconomicModuleHub.economicByTokenId(Typed.uint256(i));
      const tokenURIData: EconomicModuleTokenURIData = await (
        await fetch(tokenURI)
      ).json();

      const metaIdentityContract = new ethers.Contract(
        owner,
        metaIdentityABI,
        provider
      );

      const member = await metaIdentityContract.totalSupply();
      const obj: EconomicModuleItem = {
        tokenId: i,
        state,
        owner,
        tokenURIData: json.jsonStringify(tokenURIData),
        economicAddress,
        member,
      };
      list.push(obj);
      insertOrUpdateEconomicModule(obj);
      console.log(obj);
      try {
        await getLnModule(economicAddress, member);
      } catch (e) {
        console.log(e);
      }
    }
    // console.log("list", list);
  } catch (error) {
    console.error("Error getting contract state:", error);
  }
};
