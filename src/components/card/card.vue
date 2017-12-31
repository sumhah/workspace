<template>
    <pre
        class="card"
        @dblclick="popEdit">{{ myText }} <textarea
        class="card editor"
        v-show="isEdit"
        ref="editor"
        @blur="isEdit = false"
        v-model="myText"
    ></textarea><button class="delete" @click="$emit('delete', index)">x</button></pre>
</template>

<script>
    /* eslint-disable */
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
