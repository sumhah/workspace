<template>
    <div class="editor-box" @click.stop="focusLastNode">
        <div v-show="!treeNodeData.id" class="no-data-tip">
            <div>
                <p>Select a Node</p>
            </div>
        </div>
        <TreeEditor v-show="treeNodeData.id" ref="treeEditor" :tree-node-data="treeNodeData" />
    </div>
</template>

<script>
    import TreeEditor from './tree-editor'

    export default {
        name: 'EditorBox',

        components: { TreeEditor },

        props: {
            treeNodeData: {
                required: true,
                type: Object,
                default: null,
            },
        },

        methods: {
            focusLastNode() {
                this.$refs.treeEditor.focusLastNode();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .editor-box {
        position: absolute;
        left: 460px;
        right: 0;
        top: 0;
        bottom: 46px;
        overflow: auto;

        .no-data-tip {
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;
            color: #979fad;
        }
    }
</style>
