export const CLIENT_TOKEN = 'client_token';

export const API_PORT = 2053;
export const API_PORT_NFT = 3002;
export const DOMAIN = process.env.NODE_ENV === 'production' ? 'api.cowboysnake.com' : `localhost`;
export const WEB_URL = process.env.NODE_ENV === 'production' ? 'https://marketplace.cowboysnake.com/' : `https://marketplace.cowboysnake.net/`;
export const DOMAIN_NFT = process.env.NODE_ENV === 'production' ? 'adminapi.cowboysnake.com' : `localhost`;

export const API_URL = process.env.NODE_ENV === 'production' ? `https://${DOMAIN}` : `http://${DOMAIN}:${API_PORT}`
export const API_NFT_URL = process.env.NODE_ENV === 'production' ? `https://${DOMAIN_NFT}` : `http://${DOMAIN_NFT}`

// export const CHAIN_ID_HEX = '0x61'
export const CHAIN_ID_HEX = process.env.NODE_ENV === 'production' ? '0x38' : '0x61'
// export const RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545'
export const RPC_URL = process.env.NODE_ENV === 'production' ? 'https://bsc-dataseed.binance.org' : 'https://data-seed-prebsc-1-s1.binance.org:8545'

// export const CHAIN_ID = 97
export const CHAIN_ID = process.env.NODE_ENV === 'production' ? 56 : 97

// export const SC_TOKEN = '0xf5433ca87ebcef5f013150291b92809c8f5aa843';
export const SC_TOKEN = process.env.NODE_ENV === 'production' ? '0x33b48893B8f119Fb45F431b36F830a9584804201' : '0xf5433ca87ebcef5f013150291b92809c8f5aa843';

// export const SC_TOKEN_RIM = '0x7949636e8a517c48569872213723994443ACc00E';
export const SC_TOKEN_RIM = process.env.NODE_ENV === 'production' ? '0x9FE70801C3B26f466d7e7B884659e88c7492A126' : '0x7949636e8a517c48569872213723994443ACc00E';

export const SC_NFTEggPiecesCBS = '0x45c6b67c37183d5140c7334e3d56a62102b4f60a';
// export const SC_NFTEggPiecesCBS = process.env.NODE_ENV === 'production' ? '' : '0x45c6b67c37183d5140c7334e3d56a62102b4f60a';

// export const SC_NFTEggCBS_1155 = '0xbcF39C4Cc41670F1CBfF1013393B53E91e42F5f6';
export const SC_NFTEggCBS_OLD = process.env.NODE_ENV === 'production' ? '0xEC5d5e83cF713676348044e28B7AAE4DE10c4D8c' : '0x40C86ce37BBb861c42D007Fa81461Bc5F6136327';
export const SC_SWAP_EGG = process.env.NODE_ENV === 'production' ? '0xbc502c6e6e2ceA24aA4B30E2C022321D78658b98' : '0xb16058D6f0BF98CB93Ee75E54496778783cd7B0d';

export const SC_NFTEggCBS_1155 = process.env.NODE_ENV === 'production' ? '0x0ba006915A0e5619D3850410c4a20B83FB178B74' : '0xD2A31E6c27a35daBCB21Ba1464fb1d843Ea04aA8';
// export const SC_NFTSnakeCBS = '0x8Da85A0337141CDB9Adba71EC0106a2d564069D2';
export const SC_NFTSnakeCBS = process.env.NODE_ENV === 'production' ? '0x588fDA2b7991347BCA5cE20e07d1b8aB1D46B3DB' : '0x8Da85A0337141CDB9Adba71EC0106a2d564069D2';

// export const SC_USER = '0xFE28f17e528D00E88160dD307327F354d1B38566'
export const SC_USER = process.env.NODE_ENV === 'production' ? '0x08fab69f022c5f686ea3ca0c58dd08d5ab32d967' : '0xFE28f17e528D00E88160dD307327F354d1B38566';
// export const SC_STAKING = '0xCbCE14E22553463f2C1A530e5A5229d708e42ba5';
export const SC_STAKING = process.env.NODE_ENV === 'production' ? '0x99e0dAD4448962643f942703E313aa6e0A623AA7' : '0xCbCE14E22553463f2C1A530e5A5229d708e42ba5';

// export const SC_STAKING_2 = '0x77502877728eE63b0A0262cd8A79370867416DBC';
export const SC_STAKING_2 = process.env.NODE_ENV === 'production' ? '0xC3F6590336E6CF1D953d99e0650318F48A78F236' : '0x77502877728eE63b0A0262cd8A79370867416DBC';
// export const SC_STAKING_3 = '0x7029ed09D431a5cA9C133660375164501CA8b905';
export const SC_STAKING_3 = process.env.NODE_ENV === 'production' ? '0x1DA73Bf9bF31Cb1DB2b815fDDeE73535F7dab2D7' : '0x7029ed09D431a5cA9C133660375164501CA8b905';
// export const SC_STAKING_4 = '0x6FA958AE28d04C0c2359f8bDbFb6e14b890ea604';
export const SC_STAKING_4 = process.env.NODE_ENV === 'production' ? '0x912AE38218e4753AE765C0b57dfa7acF162ddfdA' : '0x6FA958AE28d04C0c2359f8bDbFb6e14b890ea604';
// export const SC_STAKING_5 = '0xde39dD4f585028A44728724EBa3c0c6064D55778';
export const SC_STAKING_5 = process.env.NODE_ENV === 'production' ? '0xd414fc8fABE544818d2B98dF9f48af62D7F94d7e' : '0xde39dD4f585028A44728724EBa3c0c6064D55778';


// export const SC_SIGN = '0xCfE1EB1FEbeF88AeD45065d87C4b75cF7d576955';
export const SC_SIGN = process.env.NODE_ENV === 'production' ? '0x79c546888ECa74e82c84Db29eeBE6dd816aAE2a4' : '0x4f0736236903E5042abCc5F957fD0ae32f142405';
// export const SC_USER_SNAKE = '0x009fbfe571f29c3b994a0cd84B2f47b7e7D73CDC';
export const SC_USER_SNAKE = process.env.NODE_ENV === 'production' ? '0x08fAb69f022c5F686Ea3CA0C58Dd08d5ab32D967' : '0x009fbfe571f29c3b994a0cd84B2f47b7e7D73CDC';

export const SC_SELL_EGG_UNICORN = '0x61753812b992C49f6Fc64CF0F6abB7FC872Cbe5D';
// export const SC_SELL_EGG_UNICORN = process.env.NODE_ENV === 'production' ? '' : '0x61753812b992C49f6Fc64CF0F6abB7FC872Cbe5D';

export const SC_CLAIM = '0x49CC24E6d100F5B2eE44ce35e8eBEB4182210cFe';
// export const SC_CLAIM = process.env.NODE_ENV === 'production' ? '' : '0x49CC24E6d100F5B2eE44ce35e8eBEB4182210cFe';

// export const SC_GAME_RIM = '0xa1292b0a4deD6773f42d17E0dA9fEC4dDC12682E';
export const SC_GAME_RIM = process.env.NODE_ENV === 'production' ? '0x715E7B77F0AD7dA720AD01716B8f12DC494Fa198' : '0xa1292b0a4deD6773f42d17E0dA9fEC4dDC12682E';

// export const SC_COWS_GAME = '0xB39d8e8560660615df78E23181afAAf83315c78d';
export const SC_COWS_GAME = process.env.NODE_ENV === 'production' ? '0x781F334fdf2fB11D2341F2bE45909dC2f3Cc9172' : '0x4db4Fc209DE41AAE7AdB00cd57EAeBfcCf8D9962';

// export const SC_COWS_GAME_1155 = '0x8857bc435e48C70D6c58f2c6Ee477FcD4C5d593c';
export const SC_COWS_GAME_1155 = process.env.NODE_ENV === 'production' ? '0x0539c877a8530437A032A95a32BD960Da21A3C46' : '0x8857bc435e48C70D6c58f2c6Ee477FcD4C5d593c';

// export const SC_MARKET_EGG_1155 = '0xFE4453193fB994704908f97FDC86fEa7D3729D83';
export const SC_MARKET_EGG_1155 = process.env.NODE_ENV === 'production' ? '0x36e2E133fde7C2D148E5b0124e3a3211d3eF2066' : '0xFE4453193fB994704908f97FDC86fEa7D3729D83';

// export const SC_MARKET_SNAKE_721 = '0xEb82AC572548948e98112b8DdD8AA6F17a4e8fdB';
export const SC_MARKET_SNAKE_721 = process.env.NODE_ENV === 'production' ? '0xEf5e34506b76181b7A640056Ea350FaB661c101c' : '0xEb82AC572548948e98112b8DdD8AA6F17a4e8fdB';


// export const SC_NEP_1 = '0x80dDc059f1F80eA81fB8875b86572a1d366b6Ec3';
export const SC_NEP_1 = process.env.NODE_ENV === 'production' ? '0xBffA206f1584e7f83Ea40f70371463edA93aaba5' : '0x05122f5847Aa44D194F3641e9a84DF53061DD1b6';
// export const SC_NEP_2 = '0x99778Bb324f6d3369dEb0fb534f84B64F77F7F69';
export const SC_NEP_2 = process.env.NODE_ENV === 'production' ? '0x45125E6763c5f1f8EA2a7549F6B39C1A6403339A' : '0x715c78C4CCef5917F4c4ACe6983CA2548d9eA817';
// export const SC_NEP_3 = '0x8CC486774f0a15bDDA11E33C73d0ce247E992295';
export const SC_NEP_3 = process.env.NODE_ENV === 'production' ? '0x7A3422aA3FF52c6edeE5DCd5A0213047bD0B397E' : '0x85da6134393869cA3143aaa6c479032C2954FBdD';
// export const SC_NEP_4 = '0x49a6DD47b5eD9e703f18e654e5e9A1D2cEfd2DD8';
export const SC_NEP_4 = process.env.NODE_ENV === 'production' ? '0x5cFff1d5c0Fda4A8A0f746da4Fb676dc7fda21ea' : '0x278490f84F0f87805cC6C9c08ef80e79410C7a1e';
// export const SC_NEP_5 = '0x24f2aD9073F0B35B92f39e99390eB1AC29DD1dF3';
export const SC_NEP_5 = process.env.NODE_ENV === 'production' ? '0xea2576Cc6faFd071057810F150Ea65CDFd8C9236' : '0xF4A55390C669E7A8f97d9464cC38dd9B9fE1EB8B';
// export const SC_NEP_6 = '0x4ea3f9404490bC0A0913b7C22242017B259bED0A';
export const SC_NEP_6 = process.env.NODE_ENV === 'production' ? '0x5A656B1eD798b94A39Eb6a882311b5e1A5c1D60A' : '0x54bF5EcD52904bf68c017faa4B126190cD024e84';
// export const SC_NEP_7 = '0xF86f87AD8C2ca65a648B8B62377f85007544C4b6';
export const SC_NEP_7 = process.env.NODE_ENV === 'production' ? '0x716a8bFAfCE0a5c84E596AeBb4a4fe807cFa94f1' : '0xF86f87AD8C2ca65a648B8B62377f85007544C4b6';
// export const SC_NEP_8 = '0x9fcC83A46cCB32C1500b7AB3BCCE09b7148f5a37';
export const SC_NEP_8 = process.env.NODE_ENV === 'production' ? '0x466200e04102b5fd6Cd918592941E11e3Eb55067' : '0x9fcC83A46cCB32C1500b7AB3BCCE09b7148f5a37';
// export const SC_NEP_9 = '0xec454Be2f26941d5E4FC3f91dD3ca892ED965880';
export const SC_NEP_9 = process.env.NODE_ENV === 'production' ? '0xEBE7Ff4392d5C6aedcF6Ef3aBf4c7d9DdB34e8CD' : '0xec454Be2f26941d5E4FC3f91dD3ca892ED965880';
// export const SC_NEP_10 = '0xFa86F69F19e3c94899561e547B327A02fcD5F2f5';
export const SC_NEP_10 = process.env.NODE_ENV === 'production' ? '0x0BBef9934C82218900C3f7374baF01169fF0f0FF' : '0xFa86F69F19e3c94899561e547B327A02fcD5F2f5';
// export const SC_NEP_11 = '0x0c04e6DD217568b32a2F3f083dB6319e35C8d478';
export const SC_NEP_11 = process.env.NODE_ENV === 'production' ? '0x0094d414B0Cb945dE3e1c82258223c709aD5385B' : '0x0c04e6DD217568b32a2F3f083dB6319e35C8d478';
// export const SC_NEP_12 = '0xc940EfB36baf8b1eB8dBF029b4d5e224cF62f5AB';
export const SC_NEP_12 = process.env.NODE_ENV === 'production' ? '0x2b4A1aCA9D3C912e51a9748f04d1f4D80761FB50' : '0xc940EfB36baf8b1eB8dBF029b4d5e224cF62f5AB';
// export const SC_NEP_13 = '0x809Dc970A0216E282181047E52713a5c578d815A';
export const SC_NEP_13 = process.env.NODE_ENV === 'production' ? '0xe91faa3f89946b236Dc6fe79F2DBCF20dC2cb7CD' : '0x809Dc970A0216E282181047E52713a5c578d815A';
// export const SC_NEP_14 = '0x6B906d450Ba7936b60Ea4947758a5BcB60CECc44';
export const SC_NEP_14 = process.env.NODE_ENV === 'production' ? '0xa710114351CF2385A4003001DB1Be2EAd7E8786b' : '0x6B906d450Ba7936b60Ea4947758a5BcB60CECc44';
// export const SC_NEP_15 = '0x78cfFD95305359E69C2F2ED01a5DE45F3e923449';
export const SC_NEP_15 = process.env.NODE_ENV === 'production' ? '0x2bCbd387555a60c1296E0DF4Bf3235d3fD080444' : '0x78cfFD95305359E69C2F2ED01a5DE45F3e923449';
// export const SC_NEP_16 = '0x6D637aD8F83fddAc9d82a34bC49D7F9F48fA291e';
export const SC_NEP_16 = process.env.NODE_ENV === 'production' ? '0x95E8A838609314C6beE4C5D6b6F258E6B8bF5bc5' : '0x6D637aD8F83fddAc9d82a34bC49D7F9F48fA291e';
// export const SC_NEP_17 = '0x21ABF3932AFbeafAaEa4bF004D320f954E6DAe7F';
export const SC_NEP_17 = process.env.NODE_ENV === 'production' ? '0x1a23FBaD8315519fd7c6Dd526659176e8b667b5e' : '0x21ABF3932AFbeafAaEa4bF004D320f954E6DAe7F';
