/**
 * @Author: 酱油
 * @Email: lineryforjs@gmail.com
 * @Date: 2019-09-07
 */

function echoInputWidth(calcWidth) {
    return `${Math.max(calcWidth + 4, 30)}px`;
}

function syncElementWidth(el) {
    const calcTag = document.getElementById('calc-tag');
    calcTag.innerHTML = el.firstElementChild.value.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    if (el.firstElementChild.value.includes('urrent-user #default="{ user }"')) {
        console.log(calcTag.offsetWidth);
    }
    el.style.width = echoInputWidth(calcTag.offsetWidth);
}

export default {
    inserted(el) {
        setTimeout(() => {
            syncElementWidth(el);
        }, 0);
    },
    update(el) {
        syncElementWidth(el);
    },
}
