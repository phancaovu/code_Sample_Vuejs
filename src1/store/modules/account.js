import {CLIENT_TOKEN} from "@/utils/config";
import * as moment from 'moment'

const getDefaultState = () => {
    return {
        detail: {
            id: null,
            wallet_address: null,
            ref_id: null,
            token: null,
            ref_wallet_address: null
        },
        wallet: {
            balance: 0,
            balance_CGOLD: 0,
            signer: null,
            auto_connect: 'off',
        },
        assets: {
            cows: 0,
            rim: 0,
            grim: 0,
        },
    }
}

const state = {
    detail: {
        id: null,
        wallet_address: null,
        ref_id: null,
        token: sessionStorage.getItem(CLIENT_TOKEN),
        ref_wallet_address: null
    },
    wallet: {
        balance: 0,
        balance_CGOLD: 0,
        signer: null,
        auto_connect: false,
    },
    assets: {
        cows: 0,
        rim: 0,
        grim: 0,
    },
    game_assets: {
        cows: 0,
        rim: 0,
        grim: 0,
    },
}

const mutations = {
    SET_PROFILE(state, data) {
        state.detail = data;
        
    },
    RESET_STATE(state) {
        localStorage.clear();
        sessionStorage.clear();
        Object.assign(state, getDefaultState())
        sessionStorage.setItem('auto_connect', 'off');
    },
    UPDATE_WALLET_ADDRESS(state, data) {
        state.detail.wallet_address = data;
    },
    UPDATE_SIGNER(state, data) {
        state.wallet.signer = data;
    },
    UPDATE_REF(state, data) {
        state.detail.ref_wallet_address = data;
    },
    UPDATE_ASSET(state, data) {
        state.assets = data;
    },
    UPDATE_ASSET_GAME(state, data) {
        state.game_assets = data;
    }
}
const actions = {
    updateWalletAddress({commit}, data) {
        commit('UPDATE_WALLET_ADDRESS', data)
    },
    updateSigner({commit}, data) {
        commit('UPDATE_SIGNER', data)
    },
    updateAsset({commit}, data) {
        commit('UPDATE_ASSET', data);
    },
    updateRefDetail({commit}, data) {
        commit('UPDATE_REF', data);
    },
    resetState({commit}) {
        commit('RESET_STATE');
    },
    loginWallet({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/auth/login', data).then(response => {
                let {data, message, success, code} = response;
                if (code === 0 && success) {
                    commit('SET_PROFILE', data);
                    sessionStorage.setItem(CLIENT_TOKEN, data.token);
                    resolve(response);
                } else if (code === 0 && !success) {
                    resolve(response);
                } else {
                    reject(message);
                }
            }).catch(reject);
        })
    },
    registerAccountGame({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/auth/register', data).then(response => {
                let {data, message, success, code} = response;
                if (code === 0 && success) {
                    // commit('SET_PROFILE', data);
                    resolve(response);
                } else if (code === 0 && !success) {
                    resolve(response);
                } else {
                    reject(message);
                }
            }).catch(reject);
        })
    },
    getProfile({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', '/account/detail', data).then(response => {
                let {data, message, success, code} = response;
                if (success) {
                    commit('SET_PROFILE', data);
                    resolve(response);
                } else {
                    reject(message);
                }
            }).catch(reject);
        })
    },
    getAssets({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/account/assets').then(response => {
                let {data, message, success} = response;
                if (success) {
                    commit('UPDATE_ASSET_GAME', data);
                    resolve(response);
                } else {
                    reject(message);
                }
            }).catch(reject);
        })
    },
    changePassword({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/account/change-password', data).then(resolve).catch(reject);
        })
    },
    decodeToken({state, commit}) {
        try {
            let data = JSON.parse(atob(state.detail.token.split('.')[1]));
            commit('SET_PROFILE', {
                wallet_address: data.wallet_address,
                email: data.email,
                username: data.username,
                token: state.detail.token,
            });
            return data;
        } catch (e) {
            return null;
        }
    },
    checkTokenAlive({state}) {
        try {
            let data = JSON.parse(atob(state.detail.token.split('.')[1]));
            return data.exp >= moment().utc().subtract(1, 'h').unix();
        } catch (e) {
            return false;
        }
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
