<template>
    <div id="app">
        <div class="GameScreen">
            <canvas width="512" height="448" ref="canvas">A drawing of something.</canvas>
        </div>
        <ul class="command">
            <li class="left"></li>
            <li class="right"></li>
            <li class="up"></li>
            <li class="down"></li>
        </ul>
    </div>
</template>

<script>
    /* eslint-disable */

    export default {
        name: 'app',
        mounted() {
            const app = new App(this.$refs.canvas);
        }
    }
</script>

<style src="./scss/index.scss"></style>
