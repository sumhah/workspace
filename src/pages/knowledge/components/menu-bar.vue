<template>
    <div class="menu-bar">
        <div class="left-area">
            <SearchBar />
            <i class="btn-action btn-delete el-icon-delete" @click="remove"></i>
        </div>
        <div class="right-area">
            <el-button
                class="sync-btn"
                type="success"
                icon="el-icon-upload"
                v-loading="isInToSync"
                @click="syncToServer"
            >
                Cloud Sync
            </el-button>
        </div>
    </div>
</template>

<script>
    import { debounce } from '@libs/util.js'

    export default {
        name: 'MenuBar',

        props: {
            currentTree: {
                required: true,
                type: Object,
            },

            treeDataList: {
                required: true,
                type: Array,
                default: null,
            },
        },

        data(){
            return {
                isInToSync: false,
            }
        },

        watch: {
            treeDataList: {
                deep: true,
                handler() {
                    this.autoSync();
                },
            },
        },

        methods: {
            async remove() {
                this.$emit('remove-current-node')
            },

            autoSync: debounce(function () {
                this.syncToServer();
            }, 1000),

            async syncToServer() {
                if (this.isInToSync) return;

                try {
                    this.isInToSync = true;
                    const {id, content} = this.currentTree;
                    await this.put(`/tree/${id}`, {content: JSON.stringify(content)});
                } catch (e) {
                    this.$message.error('Synchronization failed. Please check the network');
                }
                this.isInToSync = false;
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../scss/theme.scss";

    .menu-bar {
        .btn-delete {
            font-size: 20px;margin-left: 10px;
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

        .setting-btn, .sync-btn {
            box-sizing: border-box;
            font-size: 12px;
            height: 46px;
            line-height: 44px;
            padding: 0 12px;
            margin-left: 10px;
            min-width: 60px;
            border: none;
            border-radius: 0;
            //border: 1px solid $themeActiveColor;
            color: $themeActiveColor;
            cursor: pointer;
            vertical-align: middle;
            background-color: $bgColor;
            transition: all .3s ease;

            &:hover {
                color: #ffffff;
                background-color: $themeActiveColor;
            }
        }
    }
</style>
