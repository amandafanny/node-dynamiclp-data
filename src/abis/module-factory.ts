// Generated by @wagmi/cli@0.1.15 on 7/27/2023 at 11:23:09 AM

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ModuleFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const moduleFactoryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'lnModule', internalType: 'address', type: 'address' },
      { name: 'feeLinearModule', internalType: 'address', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'InitParamsInvalid' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'FEE_LINEAR_MODULE_IMP',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'LN_MODULE_IMP',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'passTokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_targetPrice', internalType: 'int256', type: 'int256' },
      { name: '_priceDecayPercent', internalType: 'int256', type: 'int256' },
      { name: '_perTimeUnit', internalType: 'int256', type: 'int256' },
      { name: 'currency', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
    ],
    name: 'mintFeeLinearVRGDAModule',
    outputs: [
      { name: 'feeLinearModule', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'passTokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'currency', internalType: 'address', type: 'address' },
      { name: 'startAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'mintFeePercent', internalType: 'uint16', type: 'uint16' },
      { name: 'burnFeePercent', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'mintLnModule',
    outputs: [{ name: 'economic', internalType: 'address', type: 'address' }],
  },
] as const
