const state = {}
const mutations = {}
const actions = {
    checkTransaction({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/transaction/check', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    checkDepositRimTransaction({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/transaction/check-rim', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    listUserReback({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/client-user/list-user-recheck', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    submitReback({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/client-user/submit-recheck', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    checkDepositGame1155Egg({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/transaction/check-deposit-egg-1155', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    listConfigCompoundPiece({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/compound-piece-config/list', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    updateCompoundPiece({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/compound-piece-config/update', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    listConfigOpenEggUnicornRate({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/open-egg-unicorn-rate-config/list', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    updateOpenEggUnicornRate({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/open-egg-unicorn-rate-config/update', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    listConfigOpenBoxRate({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/open-box-rate-config/list', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    updateOpenBoxRate({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/open-box-rate-config/update', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    updateWebConfig({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/web-config/update', data, ).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    listWebConfig({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/web-config/list', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    checkPagePassword({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/page-password/check', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    updatePagePassword({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/page-password/update', data).then(response => {
                let {message, success, data} = response;
                if (success) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(reject);
        })
    },
    listPieceRefund({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/reback-piece/list', data).then(resolve).catch(reject);
        })
    },
    updatePieceRefund({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/reback-piece/update', data).then(resolve).catch(reject);
        })
    },
    listEggRefund({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/reback-egg/list', data).then(resolve).catch(reject);
        })
    },
    updateEggRefund({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/reback-egg/update', data).then(resolve).catch(reject);
        })
    },
    listSnakeRefund({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/reback-snake/list', data).then(resolve).catch(reject);
        })
    },
    updateSnakeRefund({commit}, data) {
        return new Promise((resolve, reject) => {
            API_NODE('POST', 'cpanel-api/reback-snake/update', data).then(resolve).catch(reject);
        })
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
