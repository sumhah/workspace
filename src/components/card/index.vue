<template>
    <div class="card"
         @dblclick="popEdit"
    >
        <pre
            class="card-pre"
            v-highlightjs="item.text"
        ><code class="code"></code> </pre>
        <textarea
            class="card editor"
            v-show="isEdit"
            ref="editor"
            @blur="isEdit = false"
            v-model="item.text"
        ></textarea>
        <button class="delete" @click="remove">x</button>
        <button class="relate-time" @click="relateTime">relate time</button>
        <button class="relate-content" @click="relateText">relate content</button>
    </div>
</template>

<script>
    /* eslint-disable */
    import Vue from 'vue'
    import VueHighlightJS from 'vue-highlightjs'
    import {mapState} from 'vuex'

    Vue.use(VueHighlightJS);

    export default {
        props: {
            item: Object,
        },
        data() {
            return {
                isEdit: false,
            }
        },
        name: 'card',
        computed: {
            ...mapState(['cardList'])
        },
        methods: {
            popEdit() {
                this.isEdit = true;
                this.$nextTick(() => this.$refs.editor.focus());
            },
            remove() {
                this.$store.commit('removeCard', this.item)
            },
            relateTime() {
                this.$store.commit('relateTime', this.item)
            },
            relateText() {
                const t = Date.now();
                this.$store.commit('relateText', this.item)
                console.log(`${Date.now() - t}ms`);
            },
        },
    }
</script>

<style lang="scss" src="./index.scss" scoped></style>
