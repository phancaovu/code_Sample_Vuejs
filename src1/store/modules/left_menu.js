const state = {
    data: {}
}
const mutations = {
    SET_LEFT_MENU(state, data) {
        _.forEach(data, (item, key) => {
            try {
                state['data'][key] = {
                    type: key,
                    value: JSON.parse(item['value'])
                }
            } catch (e) {
                state['data'][key] = {
                    type: key,
                    value: item['value']
                }
            }
        });
    }
}
const actions = {
    loadConfig({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'api/web-config/list', data).then(response => {
                let {data, success} = response;
                if (success) {
                    commit('SET_LEFT_MENU', _.keyBy(data, 'type'));
                }
                resolve(response);
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
