import { ethers } from "ethers";
import { passABI } from "./abis/pass";
import { identityHubABI } from "./abis/identity-hub";
import { moduleFactoryABI } from "./abis/module-factory";
import { treasuryWithNftABI } from "./abis/treasury-with-nft";
import { tvlStakingABI } from "./abis/tvl-staking";
import { economicModuleHubABI } from "./abis/economic-module-hub";
import data from "./address/run-latest.json";
import stakeData from "./address/stake.json";

const provider = new ethers.JsonRpcProvider(
  "https://eth-goerli.g.alchemy.com/v2/wxt4mRmkJ7dSffMidEpaxcVf-hTAashX"
);

export interface ContractAddresses {
  [prop: string]: `0x${string}`;
}

export interface ContractName {
  [prop: `0x${string}`]: string;
}

const getAddress = (
  data: { contractName: string; contractAddress: string }[]
) => {
  const obj: ContractAddresses = {};
  data.forEach((val) => {
    obj[val.contractName] = val.contractAddress as `0x${string}`;
  });

  return obj;
};

export const contractNameToAddress = getAddress([
  ...data.transactions,
  ...stakeData.transactions,
]);

export const contractAddressToName = (() => {
  const obj: ContractName = {};
  for (let [key, val] of Object.entries(contractNameToAddress)) {
    obj[val] = key;
  }
  return obj;
})();

export const contractInfo: Record<
  string,
  {
    address: `0x${string}`;
    abi: ethers.InterfaceAbi;
  }
> = {
  Pass: {
    address: contractNameToAddress.Pass,
    abi: passABI,
  },
  IdentityHub: {
    address: contractNameToAddress.IdentityHub,
    abi: identityHubABI,
  },
  ModuleFactoryProxy: {
    address: contractNameToAddress.ModuleFactoryProxy,
    abi: moduleFactoryABI,
  },
  EconomicModuleHub: {
    address: contractNameToAddress.EconomicModuleHub,
    abi: economicModuleHubABI,
  },
  TVLStaking: {
    address: contractNameToAddress.TVLStaking,
    abi: tvlStakingABI,
  },
  TreasuryWithNFT: {
    address: contractNameToAddress.TreasuryWithNFT,
    abi: treasuryWithNftABI,
  },
  // PAY_FOR_ALCHEMIST: {
  //   address: contractNameToAddress.PAY_FOR_ALCHEMIST,
  //   abi: payForAlchemistABI,
  // },
  // ALCHEMIST: {
  //   address: contractNameToAddress.ALCHEMIST,
  //   abi: alchemistABI,
  // },
  // META_IDENTITY_TOKEN_URI_HUB: {
  //   address: contractNameToAddress.META_IDENTITY_TOKEN_URI_HUB,
  //   abi: metaIdentityTokenUrIhubABI,
  // },
  // ALCHEMIST_SHARE: {
  //   address: contractNameToAddress.ALCHEMIST_SHARE,
  //   abi: alchemistShareABI,
  // },
  // PassRegistry: {
  //   address: contractNameToAddress.PassRegistry,
  //   abi: passRegistryABI,
  // },
};

const contract = () => {
  // @ts-ignore
  const obj: Record<contractName, ethers.Contract> = {};
  for (let item of Object.keys(contractInfo)) {
    obj[item] = new ethers.Contract(
      contractInfo[item].address,
      contractInfo[item].abi,
      provider
    );
  }
  return obj;
};

export default contract();
