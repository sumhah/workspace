<template>
    <div class="app">
        <div class="earnings">总收益: <span class="money">{{ totalEarn }}</span> 元</div>
        <div id="chart"></div>
        <ul class="status-list">
            <li v-for="item in list" :key="item" class="item">
                <div class="name">{{ item.name }}</div>
                <div
                    class="progress"
                >
                    <div
                        class="value"
                        :style="{
                            width: item.value / item.max * 100 + '%'
                         }"
                    >
                        {{ item.value }} ({{ item.unit }})
                        <div class="stripes">
                            <div v-for="stripe in [...Array(20).fill(0)]" :key="stripe" class="stripe"></div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="todo-input">
            <input
                v-model="input.content"
                type="text"
                class="input"
                placeholder="内容"
            />
            <label for="office">公司</label>
            <input
                id="office"
                v-model="input.locations"
                type="checkbox"
                name="office"
                value="office"
                checked="checked"
            />
            <label for="home">宿舍</label>
            <input
                id="home"
                v-model="input.locations"
                type="checkbox"
                name="home"
                value="home"
                checked="checked"
            />
            <label for="outdoor">室外</label>
            <input
                id="outdoor"
                v-model="input.locations"
                type="checkbox"
                name="outdoor"
                value="outdoor"
                checked="checked"
            />
            <input
                v-model="input.type"
                type="text"
                class="input"
                placeholder="类别"
            />
            <input
                v-model.number="input.weight"
                type="text"
                class="input"
                placeholder="收益"
            />
            <input
                v-model.number="input.cycle"
                type="text"
                class="input"
                placeholder="周期(小时)"
            />
            <button
                class="submit-btn"
                :class="{
                    on: inputCanSubmit
                }"
                @click="submit"
            >
                新增
            </button>
        </div>
        <button
            class="save-btn"
            @click="save"
        >
            保存
        </button>
        <div class="tab-list">
            <div
                v-for="item in placeList"
                :key="item"
                class="tab"
                :class="{
                    on: currentPlace === item
                }"
                @click="currentPlace = item"
            >
                {{ placeMap[item] }}
            </div>
        </div>
        <ul class="todo-list">
            <transition-group name="fade">
                <li
                    v-for="(item) in showTodoList"
                    v-show="todoInCurrentPlace(item)"
                    :key="item.id"
                    class="item"
                    :class="{
                        urgency: isUrgency(item)
                    }"
                    @click="complete(item)"
                >
                    <p class="text">{{ item.content }}</p>
                    <span class="weight">{{ item.weight }}元</span>
                </li>
            </transition-group>
        </ul>
    </div>
</template>

<script>
import G2 from '@antv/g2';
import eatSound from '@/audio/eat.mp3';

const DAY_MS = 24 * 3600 * 1000;
const HOUR_MS = 3600 * 1000;

export default {
    name: 'Status',
    data() {
        const data = localStorage.getItem('status_data');

        return {
            list: [
                // {
                //     value: 2,
                //     max: 10000,
                //     unit: 'kg',
                //     name: '收益',
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
                weight: 10,
            },
            todoList: data ? JSON.parse(data) : [],
            currentTime: Date.now(),
            myChart: null,
            eatSound: null,
            placeList: ['office', 'home', 'outdoor'],
            currentPlace: 'office',
            placeMap: {
                office: '公司',
                home: '宿舍',
                outdoor: '室外'
            }
        };
    },
    computed: {
        inputCanSubmit() {
            const { input } = this;
            return input.content && input.locations.length > 0 && input.type && input.weight;
        },
        showTodoList() {
            return this.todoList.filter(item => this.getItemNextTime(item) <= this.currentTime).sort((item1, item2) => item2.weight - item1.weight);
        },
        weekEarnList() {
            return [...Array(7)]
                .fill(0)
                .map((item, i) => {
                    const dateObj = new Date(Date.now() - i * DAY_MS);
                    const month = dateObj.getMonth() + 1;
                    const date = dateObj.getDate();
                    return {
                        date: `${month}/${date}`,
                        earn: this.todoList.reduce((total, todoItem) => {
                            const weekTimeList = todoItem.doneTimeList.filter(timeItem => new Date(timeItem).getDate() === date);
                            return total + weekTimeList.length * todoItem.weight;
                        }, 0),
                    };
                })
                .reverse();
        },
        totalEarn() {
            return this.todoList.reduce((total, item) => total + item.doneTimeList.length * item.weight, 0);
        },
    },
    watch: {
        weekEarnList() {
            this.setChart();
        },
    },
    mounted() {
        window.addEventListener('beforeunload', () => {
            this.save();
        });

        console.log(this.todoList);
        this.updateTime();

        this.eatSound = new Audio(eatSound);
        this.myChart = new G2.Chart({
            container: 'chart',
            width: 600,
            height: 300
        });
        this.setChart();

        // this.todoList.forEach(item => {
        //     item.cycle = item.cycle.replace('\b', '')
        //     item.doneTimeList = item.doneTimeList.map(timeItem => {
        //         if (timeItem === null) {
        //             return Date.now() - item.cycle * HOUR_MS
        //         }
        //         return timeItem
        //     })
        // })
    },
    methods: {
        todoInCurrentPlace(item) {
            return item.locations.includes(this.currentPlace);
        },
        updateTime() {
            // setTimeout(() => {
            //     this.currentTime = Date.now();
            //     this.updateTime();
            // }, 1000);
            requestAnimationFrame(() => {
                this.currentTime = Date.now();
                this.updateTime();
            });
        },
        save() {
            localStorage.setItem('status_data', JSON.stringify(this.todoList));
            console.log('保存成功!');
        },
        complete(item) {
            item.doneTimeList.push(Date.now());
            this.eatSound.play();
        },
        getItemNextTime(item) {
            const timeList = item.doneTimeList;
            return timeList[timeList.length - 1] + item.cycle * HOUR_MS;
        },
        submit() {
            if (!this.inputCanSubmit) {
                return;
            }

            this.todoList.push({
                ...JSON.parse(JSON.stringify(this.input)),
                id: Date.now() + Math.random().toString(16),
                doneTimeList: [Date.now() - this.input.cycle * HOUR_MS],
            });

            console.log(this.todoList);
        },
        isUrgency(item) {
            return Date.now() - this.getItemNextTime(item) > item.cycle * HOUR_MS * 3;
        },
        setChart() {
            const data = [

            ];
            const chart = this.myChart;

            chart.source(this.weekEarnList);
            chart.scale('earn', {
                min: 0
            });
            chart.scale('date', {
                range: [0, 1]
            });
            chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            chart.line().position('date*earn');
            chart.point().position('date*earn').size(4).shape('circle')
                .style({
                    stroke: '#fff',
                    lineWidth: 1
                });
            chart.render();
        },
    },
};
</script>

<style lang="scss" src="@/scss/status.scss" scoped></style>
