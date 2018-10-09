<template>
    <div class="card"
         @dblclick="popEdit"
    >
        <pre
            class="card-pre"
            v-highlightjs="text"
        ><code class="code"></code> </pre>
        <textarea
            class="card editor"
            v-show="isEdit"
            ref="editor"
            @blur="isEdit = false"
            v-model="myText"
        ></textarea>
        <button class="delete" @click="$emit('delete')">x</button>
        <button class="relate-time" @click="$emit('relateTime')">relate time</button>
        <button class="relate-content" @click="$emit('relateContent')">relate content</button>
    </div>
</template>

<script>
    /* eslint-disable */
    import Vue from 'vue'
    import VueHighlightJS from 'vue-highlightjs'
    Vue.use(VueHighlightJS);

    export default {
        props: {
            text: String,
        },
        data() {
            return {
                isEdit: false,
                myText: this.text,
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
            myText(newVal) {
                this.$emit('update:text', newVal);
            },
        },
    }
</script>

<style lang="scss" src="./card.scss" scoped></style>
