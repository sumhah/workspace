<template>
    <div class="knowledge-page">
        <pre id="calc-tag" class="calc-input"></pre>
        <el-tree
            ref="tree"
            node-key="id"
            highlight-current
            icon-class="el-icon-arrow-right"
            default-expand-all
            :expand-on-click-node="false"
            :data="userData.list"
            :indent="34"
            :draggable="userData.isDrag"
            :filter-node-method="filterNode"
        >
            <span slot-scope="{ node, data }" class="custom-tree-node" :class="[`level${node.level}`]">
                <span @click.stop>
                    <el-input
                        v-if="data.mode === 'line'"
                        v-model="data.label"
                        v-auto-width
                        class="input"
                        size="mini"
                        placeholder="请输入内容"
                    />
                    <TreeCard
                        v-else-if="data.mode === 'card'"
                        v-model="data.label"
                    />
                </span>
                <div v-if="node.level > 1" class="action-area" @click.stop>
                    <span style="margin-right: 10px;font-size: 18px;">
                        <i class="btn-toggle-mode el-icon-postcard" @click="toggleItemMode(data)"></i>
                    </span>
                    <el-rate
                        :class="{ 'always-show': userData.isShowRate }"
                        v-model="data.familiarity"
                        :colors="colors">
                    </el-rate>
                    <span v-show="!userData.isHideDeleteBtn" style="margin-left: 10px;font-size: 16px;">
                        <i
                            class="btn-delete el-icon-delete"
                            @click="remove(node, data)"
                        ></i>
                    </span>
                </div>
            </span>
        </el-tree>
        <el-button
            class="save-btn"
            type="success"
            icon="el-icon-upload"
            @click="save"
        >
            保存
        </el-button>
        <div class="menu-bar">
            <div class="left-area">
                <AddIcon @click="append()" />
                <SearchBar />
                <el-rate
                    v-model="userData.filter.familiarity"
                    style="margin-left: 22px;"
                    :colors="colors">
                </el-rate>
            </div>
            <div class="right-area">
                <el-switch
                    v-model="userData.isDrag"
                    active-color="#5fca71"
                    inactive-color="#333"
                    inactive-text="开启拖拽"
                    style="margin-right: 22px;"
                ></el-switch>
                <el-switch
                    v-model="userData.isShowRate"
                    active-color="#5fca71"
                    inactive-color="#333"
                    inactive-text="始终显示熟悉度"
                    style="margin-right: 22px;"
                ></el-switch>
                <el-switch
                    v-model="userData.isHideDeleteBtn"
                    active-color="#5fca71"
                    inactive-color="#333"
                    inactive-text="始终显示删除按钮"
                    style="margin-right: 22px;"
                >
                </el-switch>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import uuid from 'uuid/v1';

    function echoInputWidth(calcWidth) {
        return `${Math.max(calcWidth + 23 + 24, 90)}px`;
    }

    function syncElementWidth(el) {
        const calcTag = document.getElementById('calc-tag');
        calcTag.innerHTML = el.firstElementChild.value.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        if (el.firstElementChild.value.includes('urrent-user #default="{ user }"')) {
            console.log(calcTag.offsetWidth);
        }
        el.style.width = echoInputWidth(calcTag.offsetWidth);
    }

    export default {
        directives: {
            autoWidth: {
                inserted(el) {
                    setTimeout(() => {
                        syncElementWidth(el);
                    }, 0);
                },
                update(el) {
                    syncElementWidth(el);
                },
            },
        },

        data() {
            const knowledgeData = localStorage.getItem('knowledge_data');
            const userData = knowledgeData ? JSON.parse(knowledgeData) : {
                isShowRate: true,
                isDrag: false,
                isHideDeleteBtn: false,
                filter: {
                    familiarity: 3,
                },
                list: [
                    {
                        id: uuid(),
                        label: 'TREE',
                        mode: 'line',
                        familiarity: 0,
                        children: [],
                    },
                ],
            }

            return {
                userData,
                isEdit: false,
                value: null,
                colors: ['#f07178', '#e5c17c', '#98c379'],
            };
        },

        computed: {
            ...mapState(['searchText']),
        },

        watch: {
            searchText(val) {
                this.$refs.tree.filter(val);
            },
            ['userData.filter']: {
                deep: true,
                handler() {
                    this.$refs.tree.filter(this.searchText);
                }
            }
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

            // this.userData.list.forEach(item => {
            //     this.setItemData(item);
            // })
            console.log(this.userData);
            this.$refs.tree.filter(this.searchText);
        },

        methods: {
            setItemData(item) {
                item.mode = 'line';
                item.children.forEach(child => this.setItemData(child))
            },

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
                    label: '',
                    mode: 'line',
                    familiarity: 0,
                    children: [],
                };
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
                this.backup();
            },

            toggleItemMode(data) {
                data.mode = data.mode === 'card' ? 'line' : 'card';
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
                localStorage.setItem('knowledge_data', JSON.stringify(this.userData));
                this.$message.success('保存成功');
            },

            backup() {
                localStorage.setItem('knowledge-backup-data', JSON.stringify(this.userData));
            },

            dataOrParentIncludesString({ label }, { parent, level }, text) {
                if (label && label.includes(text)) return true
                if (!parent) return false
                return this.dataOrParentIncludesString(parent.data, parent, text)
            },

            filterNode(searchText, data, node) {
                const { familiarity = 0 } = data;
                if (familiarity > this.userData.filter.familiarity) return false
                if (!searchText) return true;
                return this.dataOrParentIncludesString(data, node, searchText);
            },
        },
    };
</script>

<style lang="scss" src="../scss/knowledge.scss" scoped></style>
