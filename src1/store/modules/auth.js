const state = {
    IS_ADMIN: false,
    PASSWORD: null,
}
const mutations = {
    SET_ADMIN(state, data) {
        state.IS_ADMIN = data;
    },
    SET_PASSWORD(state, data) {
        state.PASSWORD = data;
    }
}
const actions = {
    cpanelLogin({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/auth/login', data).then(response => {
                let {success} = response;
                if (success) {
                    commit('SET_ADMIN', response.data);
                    commit('SET_PASSWORD', data.password)
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    setPassword({commit}, data) {
        commit('SET_PASSWORD', data);
    },
    setAdmin({commit}, data) {
        commit('SET_ADMIN', data);
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
