const state = {}
const mutations = {}
const actions = {
    listEvent({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/event/list', data).then(resolve).catch(reject);
        })
    },
    buyChest({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/event/buy-chest', data).then(resolve).catch(reject);
        })
    },
    getEvent({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/event/find', data).then(resolve).catch(reject);
        })
    },
    selectEvent({commit}, data) {
        commit('SELECT_EVENT', data);
    },
    countBuyBox({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/event/buy-egg-unicorn', data).then(resolve).catch(reject);
        })
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
