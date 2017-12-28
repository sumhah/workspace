<template>
    <div id="app" class="app">
        <div class="steps">
            <button
                class="step-btn"
                :class="{active: currentState === i}"
                v-for="(step, i) in steps"
                @click="currentState = i"
            >{{ step }}
            </button>
        </div>
        <div class="content"
             v-show="currentState === i"
             v-for="(step, i) in steps"
        >
            <p class="p" v-for="text in stepData[i]">{{ text }}</p>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        data() {
            return {
                steps: [
                    'Demand Analysis',
                    'Development Phase',
                    'Self Testing',
                    'Test Phase',
                    'Complete Phase',
                ],
                stepData: [
                    [
                        '1.需求分析阶段， 经过沟通 理解 需求方的理想目标 ，修正文档表达的误差， 经过时间、精力和技术可实现性多个维度的成本考量，建立合理的需求2.开发阶段：，PSD  转HTML CSS添加动画获取数据，绑定事件',
                        '1.需求分析阶段， 经过沟通 理解 需求方的理想目标 ，修正文档表达的误差， 经过时间、精力和技术可实现性多个维度的成本考量，建立合理的需求2.开发阶段：，PSD  转HTML CSS添加动画获取数据，绑定事件',
                        '1.需求分析阶段， 经过沟通 理解 需求方的理想目标 ，修正文档表达的误差， 经过时间、精力和技术可实现性多个维度的成本考量，建立合理的需求2.开发阶段：，PSD  转HTML CSS添加动画获取数据，绑定事件',
                        '1.需求分析阶段， 经过沟通 理解 需求方的理想目标 ，修正文档表达的误差， 经过时间、精力和技术可实现性多个维度的成本考量，建立合理的需求2.开发阶段：，PSD  转HTML CSS添加动画获取数据，绑定事件',
                        '1.需求分析阶段， 经过沟通 理解 需求方的理想目标 ，修正文档表达的误差， 经过时间、精力和技术可实现性多个维度的成本考量，建立合理的需求2.开发阶段：，PSD  转HTML CSS添加动画获取数据，绑定事件',
                    ],
                    [
                        '开发阶段水电费地方水电费水电费',
                        '开发阶段水电费地方水电费水电费',
                        '开发阶段水电费地方水电费水电费',
                        '开发阶段水电费地方水电费水电费',
                        '开发阶段水电费地方水电费水电费',
                        '开发阶段水电费地方水电费水电费',
                        '开发阶段水电费地方水电费水电费',
                    ]
                ],
                currentState: 0
            }
        },
        name: 'app',
        mounted() {

        }
    }
</script>

<style lang="scss" src="./scss/index.scss"></style>
