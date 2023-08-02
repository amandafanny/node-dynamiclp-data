// Generated by @wagmi/cli@0.1.15 on 7/27/2023 at 11:23:19 AM

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MetaIdentityTokenURIhub
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const metaIdentityTokenUrIhubABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'nft_', internalType: 'address', type: 'address' },
      {
        name: 'defaultTokenURIengine_',
        internalType: 'address',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'defaultTokenURIengine',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'metaIdentity', internalType: 'address', type: 'address' },
    ],
    name: 'getSubMetaIdentityTokenURIhub',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getTokenURIengine',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenIdOfPass', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mintSubMetaIdentityTokenURIhub',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'nft',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenIdOfPass', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenURIengine', internalType: 'address', type: 'address' },
    ],
    name: 'setTokenURI',
    outputs: [],
  },
] as const
