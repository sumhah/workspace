<template>
    <div class="card"
         @dblclick="popEdit"
    >
        <pre
            class="card-pre"
            v-highlightjs="myText"
        ><code></code> </pre>
        <textarea
            class="card editor"
            v-show="isEdit"
            ref="editor"
            @blur="isEdit = false"
            v-model="myText"
        ></textarea>
        <button class="delete" @click="$emit('delete', item)">x</button>
        <button class="relate-time" @click="$emit('relateTime', item)">relate time</button>
        <button class="relate-content" @click="$emit('relateContent', item)">relate content</button>
    </div>
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
            item: Object,
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
            myText(newVal) {
                this.$emit('input', newVal);
            },
        },
    }
</script>

<style lang="scss" src="./card.scss"></style>
