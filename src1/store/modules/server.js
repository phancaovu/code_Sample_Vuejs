const state = {
    ping: true,
}
const mutations = {
    SET_PING(state, data) {
        state.ping = data;
    }
}
const actions = {
    ping({commit}) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/ping').then(response => {
                let {success, data} = response;
                if (success) {
                    commit('SET_PING', data);
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
