<template>
    <div id="app" class="app">
        <div class="steps">
            <button
                class="step-btn"
                :class="{active: currentState === i}"
                v-for="(step, i) in steps"
                @click="currentState = i"
            >{{ step.name }}
            </button>
        </div>
        <div class="content"
             v-show="currentState === i"
             v-for="(step, i) in steps"
        >
            <transition-group
                name="fade"
                tag="div"
            >
                <card
                    v-model="item.text"
                    :index="i"
                    :key="item.id"
                    @delete="currentData.splice(i, 1)"
                    @relateTime="relateTime"
                    @relateContent="relateContent"
                    v-show="cardShow(item)"
                    v-for="(item, i) in step.data"
                ></card>
            </transition-group>
        </div>
        <div class="menu">
            <button class="add"
                    @click="addCard"
                    :class="{active: addActive}"
            ><span class="add-icon">+</span></button>
            <div class="search-box">
                <input type="text" name="" id="" class="search"
                       v-model="searchText"
                       @focus="searchActive = true"
                       @blur="searchActive = false"
                >
                <svg
                    viewBox="0 0 16 16"
                    class="search-icon"
                    :class="{active: searchActive}"
                    width="16"
                    height="16"
                    aria-hidden="true"
                    data-reactid="26"
                ><title data-reactid="27"></title>
                    <g data-reactid="28">
                        <path
                            d="M12.054 10.864c.887-1.14 1.42-2.57 1.42-4.127C13.474 3.017 10.457 0 6.737 0S0 3.016 0 6.737c0 3.72 3.016 6.737 6.737 6.737 1.556 0 2.985-.533 4.127-1.42l3.103 3.104c.765.46 1.705-.37 1.19-1.19l-3.103-3.104zm-5.317.925c-2.786 0-5.053-2.267-5.053-5.053S3.95 1.684 6.737 1.684 11.79 3.95 11.79 6.737 9.522 11.79 6.736 11.79z"></path>
                    </g>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import card from './components/card/card.vue';
    import stringSimilarity from 'string-similarity';

    export default {
        data() {
            return {
                steps: [
                    {
                        name: 'Demand Analysis',
                        data: []
                    },
                    {
                        name: 'Development Phase',
                        data: []
                    },
                    {
                        name: 'Self Testing',
                        data: []
                    },
                    {
                        name: 'Test Phase',
                        data: []
                    },
                    {
                        name: 'Complete Phase',
                        data: []
                    }
                ],
                currentState: 0,
                addActive: false,
                searchText: '',
                searchActive: false,
            }
        },
        name: 'app',
        methods: {
            addCard() {
                for (let i = 0; i < 10; i += 1) {
                    this.currentData.push({
                        text: `
                    1.先使用全文匹配，高度相似的情况考虑完毕
                    2.仅局部小子串相似，启用关键词匹配，相同关键词越多，越相似
                    3.提取关键词进行 映射分类，  import from  let 等关键词  分类至javascript维度， 对文本打上标签
                    卡片相关性
1.时间接近度    完成
2.内容相似度
3.熟悉度  分为 ： 根据 查看次数 和时间远近
                    `,
                        checkNumber: 0,
                        createTime: Date.now(),
                        modifyTime: Date.now(),
                        id: Date.now() + Math.random(),
                    });
                }

                console.log(this.currentData);
                this.addActive = true;
                setTimeout(() => {
                    this.addActive = false;
                }, 400);
            },
            cardShow(item) {
                const searchText = this.searchText;
                if (searchText === '') {
                    return true;
                }

                return item.text.indexOf(searchText) !== -1;
            },
            relateTime(index) {
                const coreItem = this.currentData[index];
                this.currentData.sort((item1, item2) => {
                    return Math.abs(coreItem.createTime - item1.createTime) - Math.abs(coreItem.createTime - item2.createTime);
                });
            },
            relateContent(index) {
                const t = Date.now();
                const coreItem = this.currentData[index];
                this.currentData.sort((item1, item2) => {
//                    return this.contentSimilarity(coreItem, item2) - this.contentSimilarity(coreItem, item1);
                    return stringSimilarity.compareTwoStrings(coreItem.text, item2.text) - stringSimilarity.compareTwoStrings(coreItem.text, item1.text);
                });

                console.log(`${Date.now() - t}ms`);
            },
            contentSimilarity(coreItem, item) {
                const coreItemText = coreItem.text.trim();
                const itemText = item.text.trim();

                let score = 0;
                let searchNum = 0;
                const subMaxLen = Math.min(itemText.length, 50);
                for (let i = 1; i < subMaxLen; i += 1) {
                    this.textToSubStrArr(itemText, i).forEach((subStr) => {
                        const cleanStr = subStr.trim();
                        const cleanStrLen = cleanStr.length;

                        if (coreItemText.indexOf(subStr) !== -1) {
                            score += Math.pow(cleanStrLen, 5);
                        }
                        searchNum += 1;
                    })
                }
                if (searchNum > 100000) {
                    console.log('搜索次数:', searchNum);
                }
//                console.log(coreItem.text.substr(0, 10), score / (searchNum + 1), searchNum);
                return score / (searchNum + 1);
            },
            textToSubStrArr(text, subStrLen = 1) {
                const arr = [];
                for (let i = 0, len = text.length; i < len; i += subStrLen) {
                    arr.push(text.substr(i, subStrLen));
                }
                return arr;
            }
        },
        computed: {
            currentData() {
                return this.steps[this.currentState].data;
            }
        },
        created() {
            if (!localStorage.getItem('data')) {
                this.steps = [
                    {
                        name: 'Demand Analysis',
                        data: []
                    },
                    {
                        name: 'Development Phase',
                        data: []
                    },
                    {
                        name: 'Self Testing',
                        data: []
                    },
                    {
                        name: 'Test Phase',
                        data: []
                    },
                    {
                        name: 'Complete Phase',
                        data: []
                    }
                ];
            } else {
                this.steps = JSON.parse(localStorage.getItem('data'));
            }

            window.onbeforeunload = () => {
                localStorage.setItem('data', JSON.stringify(this.steps));
            }
        },
        mounted() {

        },
        watch: {},
        components: {
            card
        }
    }
</script>

<style lang="scss" src="./scss/index.scss"></style>
