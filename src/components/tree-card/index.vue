<template>
    <div
        class="card"
        @dblclick.stop="popEdit"
        @click.stop
    >
        <highlight-code auto class="card-pre">
            {{ value }}
        </highlight-code>
        <textarea
            v-show="isEdit"
            ref="editor"
            v-model="myValue"
            class="card editor"
            placeholder="请输入内容"
            @blur="isEdit = false"
        ></textarea>
<!--        <button class="delete" @click="remove">x</button>-->
    </div>
</template>

<script>

    export default {
        name: 'TreeCard',
        props: {
            value: {
                type: String,
            }
        },
        data() {
            return {
                myValue: this.value,
                isEdit: false,
            };
        },
        computed: {
        },
        watch: {
            myValue(val) {
                this.$emit('input', val)
            },
            isEdit(val) {
                this.$emit('edit-change', val)
            },
        },
        methods: {
            popEdit() {
                this.isEdit = true;
                this.$nextTick(() => this.$refs.editor.focus());
            },
            remove() {

            }
        },
    };
</script>

<style lang="scss" src="./index.scss" scoped></style>
