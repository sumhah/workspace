/**
 * @Author: 酱油
 * @Email: lineryforjs@gmail.com
 * @Date: 2019/4/29
 */

import Vue from 'vue';

const requireComponent = require.context(
    './components',
    true,
    /[\w-]+\.vue$/
);

export default {
    install() {
        requireComponent.keys().forEach((fileName) => {
            const componentConfig = requireComponent(fileName).default;
            Vue.component(componentConfig.name, componentConfig);
        });
    }
};
