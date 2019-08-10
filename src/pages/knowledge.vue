<template>
    <div class="knowledge-page">
        <div id="calcInput" class="calc-input"></div>
        <el-tree
            ref="tree"
            node-key="id"
            highlight-current
            icon-class="el-icon-arrow-right"
            default-expand-all
            :expand-on-click-node="false"
            :data="dataList"
            :indent="34"
            :draggable="!isEdit"
            :filter-node-method="filterNode"
        >
            <span slot-scope="{ node, data }" class="custom-tree-node">
                <span @click.stop>
                    <el-input
                        v-model="data.label"
                        v-auto-width
                        class="input"
                        size="mini"
                        placeholder="请输入内容"
                        :class="[`level${node.level}`]"
                        @focus="isEdit = true"
                        @blur="isEdit = false"
                    />
                <span style="margin-left: 10px;font-size: 16px;">
                    <i
                        class="btn-delete el-icon-delete"
                        @click="remove(node, data)"
                    ></i>
                </span>
                </span>
            </span>
        </el-tree>
        <el-button
            class="save-btn"
            type="primary"
            icon="el-icon-upload"
            @click="save"
        >
            保存
        </el-button>
        <div class="menu-bar">
            <AddIcon @click="append()" />
            <SearchBar />
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import uuid from 'uuid/v1';

    function echoInputWidth(calcWidth) {
        return `${Math.max(calcWidth + 23 + 24, 70)}px`;
    }

    function syncElementWidth(el) {
        const calcInput = document.getElementById('calcInput');
        calcInput.innerHTML = el.firstElementChild.value;
        el.style.width = echoInputWidth(calcInput.getBoundingClientRect().width);
    }

    export default {
        directives: {
            autoWidth: {
                inserted(el) {
                    syncElementWidth(el);
                },
                update(el) {
                    syncElementWidth(el);
                },
            },
        },

        data() {
            const knowledgeData = localStorage.getItem('knowledgeData');
            const dataList = knowledgeData ? JSON.parse(knowledgeData) : [
                {
                    id: uuid(),
                    label: '前端',
                    children: [],
                },
            ];
            return {
                dataList,
                isEdit: false,
            };
        },

        computed: {
            ...mapState(['searchText']),
        },

        watch: {
            searchText(val) {
                this.$refs.tree.filter(val);
            },
        },

        mounted() {
            window.addEventListener('keydown', (e) => {
                if (e.key === '=') {
                    this.append();
                    return;
                }
                // if (e.key === 'Backspace') {
                //     this.handleRemoveKey();
                // }
            });
        },

        methods: {

            append(data) {
                if (!data) {
                    const currentNode = this.$refs.tree.getCurrentNode();
                    console.log(currentNode);
                    if (!currentNode) {
                        this.$message.warning('请先选中要增加的节点');
                        return;
                    }
                    data = currentNode;
                }
                const newChild = {
                    id: uuid(),
                    label: 'text',
                    children: [],
                };
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
                this.backup();
            },

            handleRemoveKey() {
                const {tree} = this.$refs;
                const data = tree.getCurrentNode();
                if (!data) {
                    this.$message.warning('请先选中要删除的节点');
                    return;
                }
                const node = tree.getNode(data);
                if (!node) return;
                this.remove(node, data);
            },

            async remove(node, data) {
                const {parent} = node;
                const children = parent.data.children || parent.data;
                if (data.children.length > 0) {
                    await this.$confirm('该节点有数据，是否删除该条节点', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    });
                }
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },

            save() {
                localStorage.setItem('knowledgeData', JSON.stringify(this.dataList));
                this.$message.success('保存成功');
            },

            backup() {
                localStorage.setItem('knowledge-backup-data', JSON.stringify(this.dataList));
            },

            dataOrParentIncludesString({ label }, { parent, level }, text) {
                if (label && label.includes(text)) return true
                if (!parent) return false
                return this.dataOrParentIncludesString(parent.data, parent, text)
            },

            filterNode(searchText, data, node) {
                if (!searchText) return true;
                return this.dataOrParentIncludesString(data, node, searchText)
            },
        },
    };
</script>

<style lang="scss" scoped>
    .knowledge-page {
        min-width: 1400px;
        min-height: 100%;
        padding: 20px 20px 60px;
        background-color: #282c34;

        /deep/ .custom-tree-node {
            position: relative;
            flex: 1;
            display: flex;
            align-items: center;
            font-size: 14px;
            padding-right: 8px;
            /*border: 1px solid #eee;*/
            /*background-color: #eeeeee;*/

            &:before {
                z-index: 2;
                position: absolute;
                content: '';
                left: 0;
                top: -14px;
                width: 2px;
                height: 41px;
                background-color: #dcdfe6;
            }

            &:after {
                position: absolute;
                content: '';
                left: 0;
                bottom: 0;
                width: 36px;
                height: 2px;
                background-color: #dcdfe6;
            }
        }

        /deep/ .el-tree {
            background-color: #282c34;
        }

        /deep/ .el-tree-node {

            & > .el-tree-node__children {
                overflow: visible;
            }

            &:focus > .el-tree-node__content {
                background-color: #282c34;
            }

            &.is-current {
                & > .el-tree-node__content {
                    background-color: #1e1e1e;
                }
            }
        }

        /deep/ .el-tree-node__content {
            height: 40px;
            transition: background-color .2s ease;

            &:hover {
                background-color: #2c323c;
            }
        }

        /deep/ .el-tree-node__expand-icon {
            font-size: 14px;
        }

        /deep/ .el-input {
            $colors: (
                #ff658f
                #f07178
                #c679dd
                #98c379
                #e5c17c
                #d19a66
                #61aeef
                #57b6c2
                #ace4ff
                #a6b2c0

                /*#66b1ff*/
                /*#a28eff*/

                /*#51c6ff,*/
                /*#ffeb94,*/
                /*#e992ff,*/
                /*#d0ffb9,*/
                /*#b9ffe9,*/
                /*#c7ff8a,*/
                /*#ffd190,*/
                /*#ff86bc,*/
            );
            @each $color in $colors {
                $i: index($colors, $color);
                &.level#{$i} {

                    .el-input__inner {
                        color: $color;
                    }
                }
            }
        }

        /deep/ .el-input__inner {
            border-color: transparent;
            border-radius: 0;
            /*border: none;*/
            padding: 0 6px;
            background-color: transparent;
        }

        .btn-delete {
            transition: color .25s ease;

            &:hover {
                color: #6fb5f9;
            }
        }

        /deep/ .el-input--mini {
            font-size: 14px;
        }

        .calc-input {
            position: absolute;
            visibility: hidden;
            height: auto;
            width: auto;
            white-space: nowrap;
            font-size: 14px;
        }

        .save-btn {
            position: fixed;
            top: 0;
            right: 0;
        }

        /deep/ .el-tree-node__children {
            transition: none !important;
            animation: none !important;
        }

        /deep/ .menu-bar {
            background-color: #222;
        }

        /deep/ .add {
            color: #d7d7d7;
            background-color: #333;

            &:hover {
                transform: scale(1.2);
                color: #6bb53f;
                background-color: #fff;
            }
        }

        /deep/ .search-box .search {
            background-color: #333;

            &:focus {
                color: #fff;
                font-style: normal;
                font-weight: normal;
                background-color: #444;
                box-shadow: 0 2px 4px 3px rgba(68, 68, 68, 0.16), 0 0 0 1px rgba(68, 68, 68, 0.08);
            }
        }
    }
</style>
