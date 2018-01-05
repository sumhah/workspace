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
                this.currentData.push({
                    text: '',
                    checkNumber: 0,
                    createTime: Date.now(),
                    modifyTime: Date.now(),
                    id: Date.now() + Math.random(),
                });
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
                    return this.contentSimilarity(coreItem, item2) - this.contentSimilarity(coreItem, item1);
                });

                console.log(Date.now() - t);
            },
            contentSimilarity(coreItem, item) {
                const text1 = coreItem.text.trim();
                const text2 = item.text.trim();

                let score = 0;
                const subMaxLen = Math.max(text2.length, 20);
                for (let i = 1; i < subMaxLen; i += 1) {
                    this.textToSubStrArr(text2, i).forEach((subStr) => {
                        const cleanStr = subStr.trim();
                        const cleanStrLen = cleanStr.length;

                        if (text1.indexOf(subStr) !== -1) {
                            score += Math.pow(cleanStrLen, 4);
                        }
                    })
                }
                console.log(score / text2.length);
                return score / text2.length;
            },
            textToSubStrArr(text, n = 1) {
                const arr = [];
                for (let i = 0, len = text.length; i < len; i += n) {
                    arr.push(text.substr(i, n));
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

            window.onbeforeunload =  () => {
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
