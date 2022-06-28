const state = {}
const mutations = {}
const actions = {
    addStaking({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/staking/add', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    listStaking({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/staking/list', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    addStaking3({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/staking/add3', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    listStaking3({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/staking/list3', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    addStaking4({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/staking/add4', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    listStaking4({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/staking/list4', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    addStaking5({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/staking/add5', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    listStaking5({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/staking/list5', data).then(response => {
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
