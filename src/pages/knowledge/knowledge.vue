<template>
    <div class="knowledge-page">
        <el-button
            class="btn-toggle-tree"
            :class="{
                active: item.id === currentTree.id
            }"
            size="mini"
            v-for="item in treeDataList"
            :key="item.id"
            @click="toggleTree(item)"
        >{{ item.title }}
        </el-button>
        <Login />
        <pre id="calc-tag" class="calc-input"></pre>

        <div class="color-tree-body">
            <el-tree
                ref="tree"
                class="tree-box"
                node-key="id"
                highlight-current
                icon-class="iconfont icon-arrowon"
                empty-text="Empty"
                :expand-on-click-node="false"
                default-expand-all
                :data="currentTree.content.list"
                :indent="17"
                :draggable="config.isDrag"
                :filter-node-method="filterNode"
                @current-change="handleCurrentTreeChange"
                @node-collapse="handleCollapse"
            >
            <span
                slot-scope="{ node, data }"
                class="custom-tree-node"
                :class="[`level${node.level}`]"
                @dblclick="node.expanded = !node.expanded"
            >
                <span>
                    <i
                        class="iconfont icon-plus btn-action"
                        style="margin-left: 2px;font-size: 14px;"
                        :class="{ 'always-show': config.isShowAddBtn }"
                        @click.stop="append(data, node)"
                        @dblclick.stop
                    ></i>
                    <span class="node-text">
                        <!-- todo 优化split -->
                        {{ data.label ? data.label.split('\n')[0] : '' }}
                    </span>
                </span>
                <div v-if="node.level > 1" class="action-area" @click.stop>
                </div>
            </span>
            </el-tree>
            <div class="editor-box">
                <div v-if="!currentTreeNodeData" class="no-data-tip">
                    <div>
                        <p>Select a Node</p>
                    </div>
                </div>
                <codemirror
                    v-if="currentTreeNodeData"
                    v-model="currentTreeNodeData.label"
                    ref="codemirror"
                    :options="codemirrorOption"
                ></codemirror>
            </div>
        </div>


    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import uuid from 'uuid/v1';
    import {debounce} from '../../libs/util';
    import treeData from '../../mock/1.json';

    const requireComponent = require.context(
        './components',
        true,
        /[\w-]+\.vue$/
    );

    console.log(requireComponent);

    export default {
        data() {
            // userData.config = initConfig;
            const initConfig = {
                isShowRate: false,
                isDrag: true,
                isShowDeleteBtn: false,
                isShowAddBtn: true,
                isShowCardBtn: false,
                isSearchWithRate: false,
                filter: {
                    familiarity: 1,
                },
            };

            return {
                config: initConfig,
                colors: {
                    1: '#f07178',
                    2: '#e5c17c',
                    3: '#98c379',
                },

                treeList: [],
                treeDataList: [],
                currentTree: {
                    content: {
                        list: [],
                    },
                },
                isInSync: false,
                lastSyncTime: Date.now(),

                currentTreeNodeData: null,

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
            };
        },

        computed: {
            ...mapState(['searchText', 'profile']),
        },

        watch: {
            searchText(val) {
                this.$refs.tree.filter({searchText: val});
            },

            ['config.filter.familiarity']: {
                deep: true,
                handler() {
                    this.$refs.tree.filter({withFamiliarity: true});
                },
            },

            config: {
                deep: true,
                handler(val) {
                },
            },

            async profile(val) {
                localStorage.setItem('profile', JSON.stringify(val));
                if (val) {
                    this.$store.commit('loginShow', false);
                    this.syncFromServer();
                }
            },

            async currentTree() {
                await this.$nextTick();
                this.$refs.tree.filter({searchText: this.searchText});
            },

            treeDataList: {
                deep: true,
                handler() {
                    this.autoSync();
                },
            },

            ['currentTreeNodeData'](val) {
                // if (!this.currentTreeNodeData) return;
                // this.currentTreeNodeData.label = val;
            },
        },

        created() {
            const profile = localStorage.getItem('profile');
            if (profile) {
                this.$store.commit('setProfile', JSON.parse(profile));
            } else {
                this.get('/profile').then(data => {
                    this.$store.commit('setProfile', data);
                });
            }
        },

        mounted() {
            // this.userData.list.forEach(item => {
            //     this.setItemData(item);
            // })
            window.addEventListener('beforeunload', () => this.save());
        },

        methods: {
            initRootTree() {
                return {
                    list: [
                        {
                            id: uuid(),
                            label: 'TREE',
                            mode: 'line',
                            familiarity: 1,
                            children: [
                                this.newTreeNodeData(),
                            ],
                        },
                    ],
                };
            },

            newTreeNodeData() {
                return {
                    id: uuid(),
                    label: '',
                    mode: 'line',
                    familiarity: 1,
                    children: [],
                };
            },

            toggleTree(item) {
                this.currentTree = item;
            },

            async handleCurrentTreeChange(data, node) {
                console.log('handleCurrentTreeChange');
                this.currentTreeNodeData = data;
                await this.$nextTick();
                this.$refs.codemirror.cminstance.focus();
            },

            handleCollapse(data, node) {
                this.packUpAllChildrenNode(node);
            },

            packUpAllChildrenNode(node) {
                const {childNodes} = node;
                node.expanded = false;
                childNodes.forEach(item => this.packUpAllChildrenNode(item));
            },

            async syncFromServer() {
                if (this.isInSync) return;

                this.isInSync = true;

                try {
                    this.treeList = await this.get('/tree');
                    this.treeDataList = this.treeList.map(item => ({
                        ...item,
                        content: item.content.length <= 0 ? this.initRootTree() : (JSON.parse(item.content)),
                    }));
                    this.currentTree = this.treeDataList[0];
                    this.$message.success('Got data from server successfully');
                } catch (e) {
                    this.$store.commit('loginShow', true);
                }
                this.isInSync = false;
            },

            setItemData(item) {
                item.mode = 'line';
                item.children.forEach(child => this.setItemData(child));
            },

            append(data, node) {
                const {tree} = this.$refs;
                if (!data) {
                    const currentNode = tree.getCurrentNode();
                    if (!currentNode) {
                        this.$message.warning('Select the node you want to add first');
                        return;
                    }
                    data = currentNode;
                }
                if (!data.children) {
                    this.$set(data, 'children', []);
                }

                const nodeData = this.newTreeNodeData();
                data.children.push(nodeData);
                node.expanded = true;
                this.$nextTick().then(() => {
                    tree.setCurrentKey(nodeData.id);
                    this.handleCurrentTreeChange(nodeData);
                });
            },

            save() {
                localStorage.setItem('knowledge_data', JSON.stringify(this.treeDataList));
                this.$message.success('Saved locally');
            },

            autoSync: debounce(function () {
                this.syncToServer();
            }, 1000),

            dataOrParentIncludesString({label}, {parent, level}, text) {
                if (label && label.includes(text)) return true;
                if (!parent) return false;
                return this.dataOrParentIncludesString(parent.data, parent, text);
            },

            filterNode({searchText, withFamiliarity}, data, node) {
                const {familiarity = 0} = data;
                const {level} = node;
                if ((this.isSearchWithRate || withFamiliarity) && level > 1 && familiarity !== this.config.filter.familiarity) return false;

                if (withFamiliarity) return true;

                if (!searchText) return true;
                return this.dataOrParentIncludesString(data, node, searchText);
            },
        },
    };
</script>

<style lang="scss" src="../../scss/knowledge.scss" scoped></style>
