import {ethers} from 'ethers';
import * as ABI_SC_TOKEN from '@/utils/abi/token';
import * as ABI_SC_TOKEN_RIM from '@/utils/abi/token_rim';
import * as ABI_SC_GAME_RIM from '@/utils/abi/GameRIM';

// nft
import * as ABI_SC_NEP from '@/utils/abi/NEP';
import * as ABI_SC_NFTSnakeCBS from '@/utils/abi/NFTSnakeCBS';
import * as ABI_SC_NFTEggPiecesCBS from '@/utils/abi/NFTEggPiecesCBS';

import * as ABI_SC_STAKING from '@/utils/abi/staking';
import * as ABI_SC_STAKING_2 from '@/utils/abi/staking_2';
import * as ABI_SC_STAKING_3 from '@/utils/abi/staking_3';
import * as ABI_SC_STAKING_4 from '@/utils/abi/staking_4';
import * as ABI_SC_STAKING_5 from '@/utils/abi/staking_5';

import * as ABI_SC_USER from '@/utils/abi/user';
import * as ABI_SC_SIGN from '@/utils/abi/sign';
import * as ABI_SC_CLAIM from '@/utils/abi/claim';
import * as ABI_SC_SELL_EGG_UNICORN from '@/utils/abi/sell_egg_unicorn';
import * as ABI_SC_COWS_GAME from '@/utils/abi/cows_game';
import * as ABI_SC_MARKET_EGG_1155 from '@/utils/abi/Market_EGG_1155';
import * as ABI_BASE from '@/utils/abi/base_abi';
import * as ABI_UNICORN_EGG_1155 from '@/utils/abi/UnicornEgg1155';
import * as ABI_SC_COWS_GAME_1155 from '@/utils/abi/COWS_GAME_1155';
import * as ABI_SC_MARKET_SNAKE_721 from '@/utils/abi/COWSMarket721';
import * as ABI_UNICORN_EGG_OLD from '@/utils/abi/UnicornEggOld';
import * as ABI_SWAP_EGG from '@/utils/abi/SwapEgg';

import * as config from "@/utils/config";

const provider = new ethers.providers.JsonRpcProvider(config['RPC_URL']);

const state = {
    SC_TOKEN: new ethers.Contract(config['SC_TOKEN'], ABI_SC_TOKEN, provider),
    SC_TOKEN_RIM: new ethers.Contract(config['SC_TOKEN_RIM'], ABI_SC_TOKEN_RIM, provider),
    SC_GAME_RIM: new ethers.Contract(config['SC_GAME_RIM'], ABI_SC_GAME_RIM, provider),
    SC_STAKING: new ethers.Contract(config['SC_STAKING'], ABI_SC_STAKING, provider),
    SC_STAKING_2: new ethers.Contract(config['SC_STAKING_2'], ABI_SC_STAKING_2, provider),
    SC_STAKING_3: new ethers.Contract(config['SC_STAKING_3'], ABI_SC_STAKING_3, provider),
    SC_STAKING_4: new ethers.Contract(config['SC_STAKING_4'], ABI_SC_STAKING_4, provider),
    SC_STAKING_5: new ethers.Contract(config['SC_STAKING_5'], ABI_SC_STAKING_5, provider),


    SC_USER: new ethers.Contract(config['SC_USER'], ABI_SC_USER, provider),
    SC_SIGN: new ethers.Contract(config['SC_SIGN'], ABI_SC_SIGN, provider),
    SC_CLAIM: new ethers.Contract(config['SC_CLAIM'], ABI_SC_CLAIM, provider),
    // SC_USER_SNAKE: new ethers.Contract(config['SC_USER_SNAKE'], ABI_SC_USER_SNAKE, provider),
    SC_SELL_EGG_UNICORN: new ethers.Contract(config['SC_SELL_EGG_UNICORN'], ABI_SC_SELL_EGG_UNICORN, provider),
    SC_COWS_GAME: new ethers.Contract(config['SC_COWS_GAME'], ABI_SC_COWS_GAME, provider),
    SC_NFTSnakeCBS: new ethers.Contract(config['SC_NFTSnakeCBS'], ABI_SC_NFTSnakeCBS, provider),
    SC_NFTEggPiecesCBS: new ethers.Contract(config['SC_NFTEggPiecesCBS'], ABI_SC_NFTEggPiecesCBS, provider),
    SC_MARKET_EGG_1155: new ethers.Contract(config['SC_MARKET_EGG_1155'], ABI_SC_MARKET_EGG_1155, provider),
    SC_MARKET_SNAKE_721: new ethers.Contract(config['SC_MARKET_SNAKE_721'], ABI_SC_MARKET_SNAKE_721, provider),
    SC_NFTEggCBS_1155: new ethers.Contract(config['SC_NFTEggCBS_1155'], ABI_UNICORN_EGG_1155, provider),
    SC_COWS_GAME_1155: new ethers.Contract(config['SC_COWS_GAME_1155'], ABI_SC_COWS_GAME_1155, provider),
    SC_NFTEggCBS_OLD: new ethers.Contract(config['SC_NFTEggCBS_OLD'], ABI_UNICORN_EGG_OLD, provider),
    SC_SWAP_EGG: new ethers.Contract(config['SC_SWAP_EGG'], ABI_SWAP_EGG, provider),
}

const mutations = {
    UPDATE_SC(state, data) {
        let abi = null;
        switch (data.contract_name) {
            case 'SC_COWS_GAME_1155':
                abi = ABI_SC_COWS_GAME_1155;
                break;
            case 'SC_GAME_RIM':
                abi = ABI_SC_GAME_RIM;
                break;
            case 'SC_NFTEggCBS_1155':
                abi = ABI_UNICORN_EGG_1155;
                break;
            case 'SC_NFTEggCBS_OLD':
                abi = ABI_UNICORN_EGG_OLD;
                break;
            case 'SC_SWAP_EGG':
                abi = ABI_SWAP_EGG;
                break;
            case 'SC_MARKET_EGG_1155':
                abi = ABI_SC_MARKET_EGG_1155;
                break;
            case 'SC_MARKET_SNAKE_721':
                abi = ABI_SC_MARKET_SNAKE_721;
                break;
            case 'SC_NFTSnakeCBS':
                abi = ABI_SC_NFTSnakeCBS;
                break;
            case 'SC_NFTEggPiecesCBS':
                abi = ABI_SC_NFTEggPiecesCBS;
                break;
            case 'SC_TOKEN':
                abi = ABI_SC_TOKEN;
                break;
            case 'SC_TOKEN_RIM':
                abi = ABI_SC_TOKEN_RIM;
                break;
            case 'SC_STAKING':
                abi = ABI_SC_STAKING;
                break;
            case 'SC_STAKING_2':
                abi = ABI_SC_STAKING_2;
                break;
            case 'SC_STAKING_3':
                abi = ABI_SC_STAKING_3;
                break;
            case 'SC_STAKING_4':
                abi = ABI_SC_STAKING_4;
                break;
            case 'SC_STAKING_5':
                abi = ABI_SC_STAKING_5;
                break;
            case 'SC_USER':
                abi = ABI_SC_USER;
                break;
            case 'SC_SIGN':
                abi = ABI_SC_SIGN;
                break;
            case 'SC_CLAIM':
                abi = ABI_SC_CLAIM;
                break;
            // case 'SC_USER_SNAKE':
            //     abi = ABI_SC_USER_SNAKE;
            //     break;
            case 'SC_SELL_EGG_UNICORN':
                abi = ABI_SC_SELL_EGG_UNICORN;
                break;
            case 'SC_COWS_GAME':
                abi = ABI_SC_COWS_GAME;
                break;
        }
        if (abi) {
            state[data.contract_name] = new ethers.Contract(config[data.contract_name], abi, data.signer);
        }
    }
}

const actions = {
    getContract({commit, state}, object) {
        if (object.signer) {
            commit('UPDATE_SC', object);
        }
        try {
            return state[object.contract_name];
        } catch (e) {
            console.error(e);
            return null;
        }
    },
    getOtherContract({state}, object) {
        return new ethers.Contract(object.address, ABI_BASE, object.signer);
    },
    updateSignerContract({commit, state}, object) {
        commit('UPDATE_SC', object);
    },
    getContractPiece({state}, object) {
        return new ethers.Contract(config[object.contract_name], ABI_SC_NEP, object.signer);
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
