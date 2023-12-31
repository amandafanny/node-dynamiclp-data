// Generated by @wagmi/cli@0.1.15 on 7/27/2023 at 11:23:23 AM
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StakingContractMainnet
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stakingContractMainnetABI = [
  { type: "error", inputs: [], name: "AlreadySubscribed" },
  { type: "error", inputs: [], name: "AlreadyUnsubscribed" },
  {
    type: "error",
    inputs: [{ name: "innerError", internalType: "bytes", type: "bytes" }],
    name: "BatchError",
  },
  { type: "error", inputs: [], name: "FullyPacked" },
  { type: "error", inputs: [], name: "IncentiveOverflow" },
  { type: "error", inputs: [], name: "InsufficientStakedAmount" },
  { type: "error", inputs: [], name: "InvalidIndex" },
  { type: "error", inputs: [], name: "InvalidInput" },
  { type: "error", inputs: [], name: "InvalidTimeFrame" },
  { type: "error", inputs: [], name: "NoToken" },
  { type: "error", inputs: [], name: "NonZero" },
  { type: "error", inputs: [], name: "NotStaked" },
  { type: "error", inputs: [], name: "NotSubscribed" },
  { type: "error", inputs: [], name: "OnlyCreator" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Claim",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "token",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "rewardToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "creator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "uint256", type: "uint256", indexed: false },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "startTime",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "endTime",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "IncentiveCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      {
        name: "changeAmount",
        internalType: "int256",
        type: "int256",
        indexed: false,
      },
      {
        name: "newStartTime",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "newEndTime",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "IncentiveUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "token",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Stake",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      { name: "user", internalType: "address", type: "address", indexed: true },
    ],
    name: "Subscribe",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "token",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Unstake",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      { name: "user", internalType: "address", type: "address", indexed: true },
    ],
    name: "Unsubscribe",
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "incentiveId", internalType: "uint256", type: "uint256" }],
    name: "accrueRewards",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "datas", internalType: "bytes[]", type: "bytes[]" }],
    name: "batch",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "incentiveIds", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "claimRewards",
    outputs: [
      { name: "rewards", internalType: "uint256[]", type: "uint256[]" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "token", internalType: "address", type: "address" },
      { name: "rewardToken", internalType: "address", type: "address" },
      { name: "rewardAmount", internalType: "uint112", type: "uint112" },
      { name: "startTime", internalType: "uint32", type: "uint32" },
      { name: "endTime", internalType: "uint32", type: "uint32" },
    ],
    name: "createIncentive",
    outputs: [
      { name: "incentiveId", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "incentiveCount",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "incentives",
    outputs: [
      { name: "creator", internalType: "address", type: "address" },
      { name: "token", internalType: "address", type: "address" },
      { name: "rewardToken", internalType: "address", type: "address" },
      { name: "endTime", internalType: "uint32", type: "uint32" },
      { name: "rewardPerLiquidity", internalType: "uint256", type: "uint256" },
      { name: "lastRewardTime", internalType: "uint32", type: "uint32" },
      { name: "rewardRemaining", internalType: "uint112", type: "uint112" },
      { name: "liquidityStaked", internalType: "uint112", type: "uint112" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "uint256", type: "uint256" },
    ],
    name: "rewardPerLiquidityLast",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "token", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint112", type: "uint112" },
      { name: "incentiveIds", internalType: "uint256[]", type: "uint256[]" },
      { name: "transferExistingRewards", internalType: "bool", type: "bool" },
    ],
    name: "stakeAndSubscribeToIncentives",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "token", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint112", type: "uint112" },
      { name: "transferExistingRewards", internalType: "bool", type: "bool" },
    ],
    name: "stakeToken",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "incentiveId", internalType: "uint256", type: "uint256" }],
    name: "subscribeToIncentive",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "token", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint112", type: "uint112" },
      { name: "transferExistingRewards", internalType: "bool", type: "bool" },
    ],
    name: "unstakeToken",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "token", internalType: "address", type: "address" },
      { name: "incentiveIndex", internalType: "uint256", type: "uint256" },
      { name: "ignoreRewards", internalType: "bool", type: "bool" },
    ],
    name: "unsubscribeFromIncentive",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "incentiveId", internalType: "uint256", type: "uint256" },
      { name: "changeAmount", internalType: "int112", type: "int112" },
      { name: "newStartTime", internalType: "uint32", type: "uint32" },
      { name: "newEndTime", internalType: "uint32", type: "uint32" },
    ],
    name: "updateIncentive",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "address", type: "address" },
    ],
    name: "userStakes",
    outputs: [
      { name: "liquidity", internalType: "uint112", type: "uint112" },
      {
        name: "subscribedIncentiveIds",
        internalType: "uint144",
        type: "uint144",
      },
    ],
  },
] as const;
