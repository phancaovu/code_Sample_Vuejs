import {API_URL, CLIENT_TOKEN} from "./config";

const axios = require('axios');

window.API_NODE = function (method = 'POST', url, data = {}, headers = {}) {
    switch (method.toUpperCase()) {
        default:
            return new Promise((resolve, reject) => {
                headers['Authorization'] = `Bearer ${sessionStorage.getItem(CLIENT_TOKEN)}`
                headers['Content-Type'] = `application/json`
                headers['X-Requested-With'] = `XMLHttpRequest`
                // headers['Access-Control-Allow-Credentials'] = true

                axios.post(`${API_URL}/` + url, data, {
                    headers: headers,
                    withCredentials: true,
                }).then(response => {
                    resolve(response.data);
                }).catch(reason => {
                    if (reason.response.status === 401) {
                        sessionStorage.clear();
                    }
                    reject(reason.response.data)
                })
            })
        case "GET":
            return new Promise((resolve, reject) => {
                headers['Authorization'] = `Bearer ${localStorage.getItem(CLIENT_TOKEN)}`
                axios.get(url, {
                    params: data
                }, {
                    headers: headers,
                }).then(response => {
                    resolve(response.data);
                }).catch(reason => {
                    reject(reason.response.data)
                })
            })
    }

}
