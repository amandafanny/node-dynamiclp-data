import { Typed, ethers } from "ethers";
import { metaIdentityABI } from "../../abis/meta-identity";
import { provider } from "../..";
import json from "../../utils/json";
import { burnMember, insertOrUpdateMember } from "../../sql/member";

export interface MemberItem {
  tokenId: number;
  name: string;
  owner: `0x${string}`;
  tokenURIData?: string;
  metaIdentityAddress: `0x${string}`;
  passName: string;
  burn: boolean;
}

export const getMember = async (
  metaIdentityAddress: `0x${string}`,
  passName: string
) => {
  const contract = new ethers.Contract(
    metaIdentityAddress,
    metaIdentityABI,
    provider
  );
  try {
    // 调用合约的视图函数或读取公共变量
    const nextTokenId = await contract.nextTokenId();
    const list: MemberItem[] = [];
    console.log(metaIdentityAddress, "nextTokenId", nextTokenId, passName);
    for (let i = 1; i < nextTokenId; i++) {
      try {
        const name = await contract.name(Typed.uint256(i));
        const owner = await contract.ownerOf(Typed.uint256(i));
        const tokenURI = await contract.tokenURI(Typed.uint256(i));
        const tokenURIData = await (await fetch(tokenURI)).json();
        const obj: MemberItem = {
          tokenId: i,
          name,
          owner,
          tokenURIData: json.jsonStringify(tokenURIData),
          metaIdentityAddress,
          passName,
          burn: false,
        };
        list.push(obj);
        insertOrUpdateMember(obj);
      } catch (e: any) {
        console.log(e);
        console.log(e?.reason);
        if (e?.reason === "ERC721: invalid token ID") {
          burnMember(i, metaIdentityAddress);
        }
        throw e;
      }
    }
    console.log("list", list);
  } catch (error) {
    console.error("Error getting contract state:", error);
  }
};
