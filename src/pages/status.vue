<template>
    <div class="app">
        <h1>状态</h1>
        <ul class="status-list">
            <li class="item" v-for="item in list">
                <div class="name">{{ item.name }}</div>
                <div
                    class="progress"
                >
                    <div class="value"
                         :style="{
                         width: item.value / item.max * 100 + '%'
                         }"
                    >{{ item.value }} ({{ item.unit }})
                        <div class="stripes">
                            <div class="stripe" v-for="item in [...Array(20).fill(0)]"></div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <ul class="todo-list">
            <li class="item" v-for="(item,i) in todoList">
                <div class="text">{{ item.content }}</div>
                <div class="complete" @click="complete(i)">√</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import Manager from '@/js/manager';

    export default {
        name: 'status',
        data() {
            return {
                list: [
                    {
                        value: 46.4,
                        max: 58,
                        unit: 'kg',
                        name: '体重',
                    },
                    {
                        value: 56.4,
                        max: 100,
                        unit: 'day',
                        name: '器官损耗',
                    },
                ],
                todoList: [
                    {
                        type: '',
                        content: 'As sweet as as road',
                    },
                    {
                        type: '',
                        content: 'As sweet as as road',
                    },
                    {
                        type: '',
                        content: 'As sweet as as road',
                    },
                    {
                        type: '',
                        content: '戳了你一下~',
                    },
                ]
            }
        },
        methods: {
            complete(i) {
                this.todoList.splice(i, 1);
            },
        },
        mounted() {
            const manager = new Manager()
        },
    };
</script>

<style lang="scss" src="@/scss/status.scss" scoped></style>
