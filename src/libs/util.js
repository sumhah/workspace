var path = require('path');

export function rand(n, m) {
    return n + Math.floor(Math.random() * (m - n));
}

export function range(val, min, max) {
    const number = parseInt(val, 10);
    if (isNaN(number)) {
        return 1;
    }
    return Math.min(Math.max(number, min), max);
}

export function filterNullValue(obj) {
    return Object.keys(obj).reduce((newObj, item) => {
        const value = obj[item]
        if (value !== undefined && value !== null && value !== '') {
            newObj[item] = obj[item]
        }
        return newObj
    }, {})
}

export function removeKeys(obj, keys) {
    return Object.keys(obj).reduce((newObj, item) => {
        if (!keys.includes(item)) {
            newObj[item] = obj[item]
        }
        return newObj
    }, {})
}

export function isMobile() {
    return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
}

export function numberToK(val) {
    if (val < 1000) {
        return val;
    }
    if (val >= 1000) {
        return (val / 1000).toFixed(1) + 'K';
    }
}

export function debounce(fn, wait) {
    let timer;

    return function () {
        clearTimeout(timer)
        timer = setTimeout(fn.bind(this), wait)
    }
}

export function getLocalComponents(requireComponent) {
    return requireComponent.keys().reduce((obj, fileName) => {
        const componentConfig = requireComponent(fileName).default;
        obj[componentConfig.name] = componentConfig;
        return obj;
    }, {});
}
