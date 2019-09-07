<template>
    <div class="menu-bar">
        <div class="left-area">
            <SearchBar />
            <i
                class="btn-action btn-delete el-icon-delete"
                style="font-size: 20px;margin-left: 10px;"
                @click="remove"
            ></i>
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
    export default {
        name: 'MenuBar',

        data(){
            return {
                isInToSync: false,
            }
        },

        methods: {
            async remove() {
                const {tree} = this.$refs;
                const data = tree.getCurrentNode();
                const node = tree.getNode(data);
                if (node.level <= 1) {
                    return;
                }
                const {parent} = node;
                const children = parent.data.children || parent.data;
                // if (data.children.length > 0) {
                //     await this.$confirm('This node has data. Whether to delete this node', 'Prompt', {
                //         confirmButtonText: 'Confirm',
                //         cancelButtonText: 'Cancel',
                //         type: 'warning',
                //     });
                // }
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },

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

<style scoped>

</style>
