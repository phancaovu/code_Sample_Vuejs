const state = {}

const mutations = {
}

const actions = {
    filterSnake({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/my-wallet/my-snake', data).then(resolve).catch(reject);
        })
    },
    depositSnake({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/my-wallet/my-snake/deposit', data).then(resolve).catch(reject);
        })
    },
    filterEgg({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/my-wallet/my-egg', data).then(resolve).catch(reject);
        })
    },
    depositEgg({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/my-wallet/my-egg/deposit-1155', data).then(resolve).catch(reject);
        })
    },
    filterPiece({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/my-wallet/my-piece', data).then(resolve).catch(reject);
        })
    },
    depositPiece({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/my-wallet/my-piece/deposit', data).then(resolve).catch(reject);
        })
    },
    filterChest({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/my-wallet/my-chest', data).then(resolve).catch(reject);
        })
    },
    depositChest({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/my-wallet/my-chest/deposit', data).then(resolve).catch(reject);
        })
    },
    filterChestEvent({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/my-wallet/my-chest-event', data).then(resolve).catch(reject);
        })
    },
    depositChestEvent({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/my-wallet/my-chest-event/deposit', data).then(resolve).catch(reject);
        })
    },
    filterItem({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/my-wallet/my-item', data).then(resolve).catch(reject);
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
