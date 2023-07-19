import { lnModuleABI } from "../../abis/ln-module";
import { provider } from "../..";
import { Typed, ethers } from "ethers";
import contract from "../../contract";
import blockPerYear from "../../utils/blockPerYear";
import { erc20ABI } from "../../baseAbi/erc20";
import { insertOrUpdateLnModule } from "../../sql/lnModule";

export interface LnModuleItem {
  economicAddress: `0x${string}`;
  vaultAddress: `0x${string}`;
  tvlBalance: bigint;
  tvlSymbol: string;
  tvlDecimals: number;
  pendingToken: bigint;
  mintPrice: bigint;
  burnFee: bigint;
  mintFee: bigint;
}

export const getLnModule = async (
  economicAddress: `0x${string}`,
  member: number
) => {
  console.log("economicAddress", economicAddress, member);
  const lnModuleContract = new ethers.Contract(
    economicAddress,
    lnModuleABI,
    provider
  );
  // TODO

  const vaultAddress = await lnModuleContract._vault();
  // const developer = await lnModuleContract.developer();

  const [swap, mintFee, burnFee] = await lnModuleContract.getPrice(
    Typed.uint256(member)
  );
  const profileData = await lnModuleContract.getProfileData();
  console.log("profileData", profileData);
  const [
    currency,
    amount,
    mintFeePercent,
    burnFeePercent,
    passFeeRecipient,
    awardFeeRecipient,
  ] = profileData;
  const erc20Contract = new ethers.Contract(currency, erc20ABI, provider);
  const tvlBalance = await erc20Contract.balanceOf(vaultAddress);
  const tvlSymbol = await erc20Contract.symbol();
  const tvlDecimals = await erc20Contract.decimals();

  const pendingToken = await contract.TVLStaking.pendingToken(economicAddress);
  const apr = (Number(pendingToken) * blockPerYear()) / Number(tvlBalance);
  const obj = {
    vaultAddress,
    tvlBalance,
    tvlSymbol,
    tvlDecimals,
    pendingToken,
    apr,
    mintPrice: swap,
    mintFee,
    burnFee,
    economicAddress,
  };
  insertOrUpdateLnModule(obj);
  console.log(obj);
};
