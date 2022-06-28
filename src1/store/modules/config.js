const state = {}
const mutations = {}
const actions = {
    defineSnake({commit}, data) {
        return new Promise(async (resolve, reject) => {
            API_NODE('POST', 'cpanel-api/config/define-snake', data).then(resolve).catch(reject);
        })
    },
    configItem({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/config/set-item', data).then(resolve).catch(reject);
        })
    },
    listItem({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/config/list-item', data).then(resolve).catch(reject);
        })
    },
    listSnake({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/config/list-snake', data).then(resolve).catch(reject);
        })
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
