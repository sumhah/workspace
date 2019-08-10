<template>
    <div id="app" class="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
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

    .app {
        height: 100%;
    }

    .menu-bar {
        z-index: 3;
        position: fixed;
        left: 0;
        width: 100%;
        height: 60px;
        bottom: 0;
        background-color: #f3f3f3;
    }
</style>
