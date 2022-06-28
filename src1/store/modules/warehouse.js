const state = {}

const mutations = {}

const actions = {
    filterSnake({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/warehouse/my-snake', data).then(resolve).catch(reject);
        })
    },
    signWithdrawSnake({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/warehouse/my-snake/withdraw', data).then(resolve).catch(reject);
        })
    },
    filterEgg({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/warehouse/my-egg', data).then(resolve).catch(reject);
        })
    },
    signWithdrawEgg({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/warehouse/my-egg/withdraw-1155', data).then(resolve).catch(reject);
        })
    },
    checkWithdrawEgg({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/warehouse/my-egg/withdraw-check-1155', data).then(resolve).catch(reject);
        })
    },
    filterPiece({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/warehouse/my-piece', data).then(resolve).catch(reject);
        })
    },
    signWithdrawPiece({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/warehouse/my-piece/withdraw-1155', data).then(resolve).catch(reject);
        })
    },
    filterChest({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/warehouse/my-chest', data).then(resolve).catch(reject);
        })
    },
    filterChestEvent({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/warehouse/my-chest-event', data).then(resolve).catch(reject);
        })
    },
    checkWithdrawChestEvent({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/warehouse/my-chest-event/withdraw-check', data).then(resolve).catch(reject);
        })
    },
    filterItem({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/warehouse/my-item', data).then(resolve).catch(reject);
        })
    },
    snakeConfig({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/warehouse/snake-config', data).then(resolve).catch(reject);
        })
    },
    topSnake({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/top/snake', data).then(resolve).catch(reject);
        })
    },
    depositRIMSystem({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/warehouse/deposit-rim', data).then(resolve).catch(reject);
        })
    },
    withdrawRIMSystem({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/warehouse/withdraw-rim', data).then(resolve).catch(reject);
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
