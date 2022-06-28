import axios from "axios";

const state = {
    cows: 0,
    rim: 0,
}

const mutations = {
    SET_PRICE_COWS(state, data) {
        state.cows = data;
    },
    SET_PRICE_RIM(state, data) {
        state.rim = data;
    }
}

const actions = {
    async getPriceCows({commit}, data) {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await axios.get('https://api.pancakeswap.info/api/v2/tokens/0x33b48893b8f119fb45f431b36f830a9584804201')
                return resolve(response.data);
            } catch (e) {
                return reject(e);
            }
        })
    },
    getPriceRim({commit}, data) {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await axios.get('https://api.pancakeswap.info/api/v2/tokens/0x9fe70801c3b26f466d7e7b884659e88c7492a126')
                return resolve(response.data);
            } catch (e) {
                return reject(e);
            }
        })
    },
    setPriceCows({commit}, data) {
        commit('SET_PRICE_COWS', data);
    },
    setPriceRim({commit}, data) {
        commit('SET_PRICE_RIM', data);
    },
    convertTokenGrimToRim({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/warehouse/convert-token-grim-to-rim', data).then(resolve).catch(reject);
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
