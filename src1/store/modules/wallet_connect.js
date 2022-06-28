const state = {
    provider: null,
}

const mutations = {
    SET_PROVIDER(state, data) {
        state.provider = data;
    },
}

const actions = {
    setProvider({commit}, data) {
        commit('SET_PROVIDER', data);
        sessionStorage.setItem('auto_connect', 'on');
        sessionStorage.setItem('connect_by', 'wallet_connect');
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
