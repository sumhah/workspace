<template>
    <pre
        class="card"
        @dblclick="popEdit"
        v-highlightjs="myText"
    ><code></code> <textarea
        class="card editor"
        v-show="isEdit"
        ref="editor"
        @blur="isEdit = false"
        v-model="myText"
    ></textarea><button class="delete" @click="$emit('delete', index)">x</button><button class="relate-time" @click="$emit('relateTime', index)">relate time</button><button class="relate-content" @click="$emit('relateContent', index)">relate content</button></pre>
</template>

<script>
    /* eslint-disable */
    import Vue from 'vue'
    import VueHighlightJS from 'vue-highlightjs'
    Vue.use(VueHighlightJS);

    export default {
        props: {
            value: String,
            index: Number,
        },
        data() {
            return {
                myText: this.value,
                isEdit: false,
            }
        },
        name: 'card',
        methods: {
            popEdit() {
                this.isEdit = true;
                this.$nextTick(() => {
                    if (this.$refs.editor) {
                        this.$refs.editor.focus();
                    }
                });
            },
        },
        watch: {
            isEdit() {
                this.$emit('input', this.myText);
            }
        },
    }
</script>

<style lang="scss" src="./card.scss"></style>
