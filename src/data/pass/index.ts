import { Typed } from "ethers";
import contract from "../../contract";
import { getMember } from "../member";
import json from "../../utils/json";
import { insertOrUpdatePass } from "../../sql/pass";

export interface PassItem {
  tokenId: number;
  name: string;
  owner: `0x${string}`;
  tokenURIData?: string;
  metaIdentityAddress?: `0x${string}`;
}

export const getPass = async () => {
  try {
    // 调用合约的视图函数或读取公共变量
    const nextTokenId = await contract.Pass.nextTokenId();
    const list: PassItem[] = [];
    console.log("nextPassTokenId", nextTokenId);
    // contract.Pass.mintMetaHubCoin();
    // contract.Pass.mns();
    for (let i = 1; i < nextTokenId; i++) {
      const name = await contract.Pass.name(Typed.uint256(i));
      const owner = await contract.Pass.ownerOf(Typed.uint256(i));
      const tokenURI = await contract.Pass.tokenURI(Typed.uint256(i));
      const tokenURIData = await (await fetch(tokenURI)).json();
      // ??
      const metaIdentityAddress = await contract.IdentityHub.metaIdentity(
        Typed.uint256(i)
      );
      const obj: PassItem = {
        tokenId: i,
        name,
        owner,
        tokenURIData: json.jsonStringify(tokenURIData),
        metaIdentityAddress,
      };
      list.push(obj);
      insertOrUpdatePass(obj);
      await getMember(metaIdentityAddress, name);
    }
    // console.log("list", list);
  } catch (error) {
    console.error("Error getting contract state:", error);
  }
};
