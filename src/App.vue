<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
    };
</script>

<style lang="scss">
    @import './scss/reset.scss';
    @import "./scss/github.css";
    @import "./scss/animate.css";

    @font-face {
        font-family: "OpenSans";
        src: url('./font/OpenSans-Regular.ttf');
    }
    @font-face {
        font-family: "sourceHanSansCN";
        src: url('./font/SourceHanSansCN-Light.otf');
    }
</style>
