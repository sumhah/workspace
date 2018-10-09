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
        <div class="todo-input">
            <input type="text" class="input" v-model="input.content" placeholder="内容">
            <label for="office">公司</label>
            <input id="office" type="checkbox" name="office" value="office" v-model="input.locations" checked="checked" />
            <label for="home">宿舍</label>
            <input id="home" type="checkbox" name="home" value="home" v-model="input.locations" checked="checked" />
            <label for="outdoor">室外</label>
            <input id="outdoor" type="checkbox" name="outdoor" value="outdoor" v-model="input.locations" checked="checked" />
            <input type="text" class="input" v-model="input.type" placeholder="类别">
            <input type="text" class="input" v-model="input.weight" placeholder="权重">
            <input type="text" class="input" v-model="input.cycle" placeholder="周期">
            <button class="submit-btn" :class="{
            on: inputCanSubmit
            }" @click="submit">新增</button>
        </div>
        <ul class="todo-list">
            <li class="item" v-for="(item, i) in todoList">
                <p class="text">{{ item.content }}</p>
                <button class="complete" @click="complete(i)">√</button>
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
                    // {
                    //     value: 46.4,
                    //     max: 58,
                    //     unit: 'kg',
                    //     name: '体重',
                    // },
                    // {
                    //     value: 56.4,
                    //     max: 100,
                    //     unit: 'day',
                    //     name: '器官损耗',
                    // },
                ],
                input: {
                    content: '',
                    locations: [],
                    type: '',
                    cycle: '',
                    weight: '',
                },
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
                ],
            };
        },
        methods: {
            complete(i) {
                this.todoList.splice(i, 1)
            },
            submit() {
                if (!this.inputCanSubmit) {
                    return
                }


            }
        },
        computed: {
            inputCanSubmit() {
                const input = this.input
                return input.content && input.locations.length > 0 && input.type && input.weight
            }
        },
        mounted() {
            const manager = new Manager()
        },
    };
</script>

<style lang="scss" src="@/scss/status.scss" scoped></style>
