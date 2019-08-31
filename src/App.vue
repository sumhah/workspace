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
        display: flex;
        justify-content: space-between;
        align-items: center;
        left: 0;
        width: 100%;
        height: 60px;
        bottom: 0;
        background-color: #f3f3f3;

        .left-area, .right-area {
            display: flex;
            align-items: center;
        }
    }

    .calc-input {
        position: absolute;
        left: 0;
        top: 0;
        visibility: hidden;
        height: auto;
        width: auto;
        white-space: pre-wrap;
        font-size: 14px;
    }
</style>
