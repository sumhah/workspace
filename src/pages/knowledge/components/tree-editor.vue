<template>
    <div
        @click.stop
        @focus.stop
        class="tree-editor"
        :class="[
            `level${level}`,
            `depth${useDepth}`,
        ]"
    >
        <codemirror
            ref="codemirror"
            v-model="treeNodeData.label"
            :options="codemirrorOption"
        ></codemirror>
        <TreeEditor
            v-for="item in treeNodeData.children"
            ref="treeEditor"
            v-model="item.label"
            :level="level + 1"
            :depth="useDepth - 1"
            :key="item.id"
            :options="codemirrorOption"
            :tree-node-data="item"
        />
    </div>
</template>

<script>
    export default {
        name: 'TreeEditor',

        props: {
            level: {
                type: Number,
                default: 1,
            },

            treeNodeData: {
                required: true,
                type: Object,
                default: null,
            },

            depth: {
                type: Number,
                default: 1,
            }
        },

        data(){
            return {
                codemirrorOption: {
                    tabSize: 4,
                    styleActiveLine: true,
                    lineNumbers: true,
                    line: true,
                    foldGutter: true,
                    styleSelectedText: true,
                    mode: 'markdown',
                    // keyMap: "sublime",
                    matchBrackets: true,
                    showCursorWhenSelecting: true,
                    theme: 'material',
                    extraKeys: {'Ctrl': 'autocomplete'},
                    hintOptions: {
                        completeSingle: false,
                    },
                },
                rootDepth: 1,
            }
        },

        computed: {
            useDepth() {
                return this.level <= 1 ? this.rootDepth : this.depth;
            }
        },

        watch: {
            async treeNodeData() {
                const { codemirror } = this.$refs;
                if (!this.treeNodeData || this.level > 1 || !codemirror) return;
                this.setFocusAndCursorToLast(codemirror.cminstance);
                this.rootDepth = this.getDepth(this.treeNodeData);
            },
        },

        methods: {
            async setFocusAndCursorToLast(cminstance) {
                const { doc } = cminstance;

                await this.$nextTick();
                cminstance.focus();
                doc.setCursor(doc.lastLine(), 1000);
            },

            getDepth(treeNodeData, depth = 0) {
                if (!treeNodeData) return depth;
                const { children } = treeNodeData;
                if (!children) return depth;

                return children.reduce((depth, item) => Math.max(this.getDepth(item), depth), depth) + 1;
            },

            getLastEditor() {
                const { treeEditor } = this.$refs;
                if (!treeEditor || treeEditor.length === 0) {
                    return this.$refs.codemirror;
                }

                const lastTreeEditor = treeEditor[treeEditor.length - 1];
                return lastTreeEditor.getLastEditor();
            },

            focusLastNode() {
                this.setFocusAndCursorToLast(this.getLastEditor().cminstance)
            },
        },
    };
</script>

<style lang="scss" scoped>
    .tree-editor {
        &.depth10, &.depth9, &.depth8, &.depth7, &.depth6, &.depth5 {
            /deep/ .CodeMirror {
                font-size: 30px;
                font-weight: bold;
            }
        }

        &.depth4 {
            /deep/ .CodeMirror {
                font-size: 24px;
                font-weight: bold;
            }
        }

        &.depth3 {
            /deep/ .CodeMirror {
                font-size: 16px;
            }
        }

        &.depth2 {
            /deep/ .CodeMirror {
                font-size: 14px;
            }
        }

        &.depth1 {
            /deep/ .CodeMirror {
                font-size: 12px;
            }
        }

        @for $level from 1 to 12 {
            &.level#{$level} {
                padding-left: #{($level - 1) * 16}px;
            }
        }
    }
</style>
