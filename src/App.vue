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
    @import './scss/reset';
    @import "./scss/github";
    @import "./scss/transition";
    @import "./scss/animate";

    @font-face {
        font-family: "OpenSans";
        src: url('./font/OpenSans-Regular.ttf');
    }
    @font-face {
        font-family: "sourceHanSansCN";
        src: url('./font/SourceHanSansCN-Light.otf');
    }
</style>
