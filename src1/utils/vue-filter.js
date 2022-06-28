import Vue from 'vue'
import * as currency from 'currency-formatter'
import {ethers} from "ethers";

const moment = require('moment');

Vue.filter('money', (money, symbol = '', symbol_left = false, fixed = 2) => {
    if (symbol_left) {
        return currency.format(money, {
            symbol: symbol,
            decimal: '.',
            thousand: ',',
            precision: fixed,
            format: {
                pos: '%s %v',
                neg: '%s -%v',
                zero: '%s %v'
            },
        })
    }
    return currency.format(money, {
        symbol: symbol,
        decimal: '.',
        thousand: ',',
        precision: fixed,
        format: {
            pos: '%v %s',
            neg: '-%v %s',
            zero: '%v %s'
        },
    })
})

Vue.filter('isActive', (segment, active_class = 'active') => {
    return segment === location.pathname ? active_class : '';
})

Vue.filter('convertDate', (date, format = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(date).utc().format(format)
})
Vue.filter('convertMicrosecond', (date, format = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(date, 'x').utc().format(format)
})

Vue.filter('convertTimeStamp', (timestamp, format = 'lll') => {
    return moment(timestamp, 'x').format(format);
})

Vue.filter('convertMicroTimeStamp', (timestamp, format = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(timestamp, 'x').format(format);
})

Vue.filter('splitAddress', (address, show = 4) => {
    let strTemp = '';
    if (address == null || address.length === 0) {
        return '';
    }
    return strTemp.concat(address.slice(0, show), '...', address.slice(-1 * show));
})

Vue.filter('configSnake', (data) => {
    return data * 100;
})

Vue.filter('formatEther', (value) => {
    if (value !== undefined && value !== null) {
        return ethers.utils.formatEther(ethers.BigNumber.from(value).toString());
    }
    return '0';
})

Vue.filter('toNumber', (value) => {
    if (value !== undefined && value !== null) {
        return Number(ethers.BigNumber.from(value).toString())
    }
    return '0';
})
