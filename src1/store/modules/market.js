const state = {}

const mutations = {}

const actions = {
    listDataMarket({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/market-place/list', data).then(resolve).catch(reject);
        })
    },
    getSignSnake({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/market-place/sign-snake', data).then(resolve).catch(reject);
        })
    },
    getSignEgg({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/market-place/sign-egg', data).then(resolve).catch(reject);
        })
    },
    getSignPiece({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/market-place/sign-piece', data).then(resolve).catch(reject);
        })
    },
    getSignBuyNFT({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/market-place/sign-buy-nft', data).then(resolve).catch(reject);
        })
    },
    listWebConfig({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/market-place/web-configs', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
