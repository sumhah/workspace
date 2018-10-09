<template>
    <div id="app" class="app">
        <div class="content">
            <transition-group
                name="fade"
                tag="div"
                class="line"
                v-for="(line,i) in lines"
                :key="i"
            >
                <card
                    :item="item"
                    :text.sync="item.text"
                    :key="item.id"
                    @delete="remove(item)"
                    @relateTime="relateTime(item)"
                    @relateContent="relateContent(item)"
                    :ref="item.id"
                    v-show="cardShow(item)"
                    v-for="(item, i) in line"
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
    import card from '@/components/card/card.vue';
    import stringSimilarity from 'string-similarity';

    export default {
        data() {
            return {
                data: [],
                currentState: 0,
                addActive: false,
                searchText: '',
                searchActive: false,
                lines: [
                    [],
                    []
                ],
            }
        },
        name: 'app',
        methods: {
            addCard() {
                this.data.push({
                    text: ``,
                    checkNumber: 0,
                    createTime: Date.now(),
                    modifyTime: Date.now(),
                    id: Date.now() + (Math.random() * 10000).toFixed(0),
                });
                this.addActive = true;
                setTimeout(() => this.addActive = false, 400);
            },
            cardShow(item) {
                const searchText = this.searchText;
                if (searchText === '') {
                    return true;
                }

                return item.text.indexOf(searchText) !== -1;
            },
            remove(item) {
                const data = this.data
                data.splice(data.indexOf(item), 1);
            },
            relateTime(item) {
                const coreItem = item;
                this.data.sort((item1, item2) => Math.abs(coreItem.createTime - item1.createTime) - Math.abs(coreItem.createTime - item2.createTime))
            },
            relateContent(item) {
                const t = Date.now();
                const coreItem = item;
                this.data.sort((item1, item2) => {
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
            },
            clearData() {
                this.data.splice(0, this.data.length);
            },
            resizeWaterfall() {
//                this.$nextTick(() => {
//                    const data = this.data;
//                    const $refs = this.$refs;
//                    const styles = [];
//                    const gap = 26;
//                    const lines = [
//                        {
//                            bottom: 0,
//                            left: 0,
//                        },
//                        {
//                            bottom: 0,
//                            left: 490 + gap,
//                        },
//                    ];
//                    data.forEach((item) => {
//                        const card = $refs[`card${item.id}`][0];
//                        if (!card) {
//                            return;
//                        }
//                        const currentLine = lines.sort((line1, line2) => {
//                            return line1.bottom - line2.bottom;
//                        })[0];
//
//                        styles.push({
//                            left: currentLine.left + gap + 'px',
//                            top: currentLine.bottom + gap + 'px',
//                        });
//                        currentLine.bottom += card.$el.offsetHeight + gap;
//                        this.cardWrapperHeight = lines.sort((line1, line2) => {
//                            return line2.bottom - line1.bottom;
//                        })[0].bottom;
//                    });
//                    this.styles = styles;
//                });
            }
        },
        created() {
            if (localStorage.getItem('data')) {
                this.data = JSON.parse(localStorage.getItem('data'));
            }
            window.onbeforeunload = () => {
                localStorage.setItem('data', JSON.stringify(this.data));
            }
        },
        mounted() {
           // this.clearData();
        },
        watch: {
            data() {
                this.$nextTick(() => {
                    let bottoms = [
                        0, 0,
                    ];
                    const gap = 26;
                    const lines = [[], []];
                    const $ref = this.$refs;
                    this.data.forEach((item) => {
                        let index = bottoms[0] - 20 > bottoms[1] ? 1 : 0;
                        if ($ref[item.id]) {
                            bottoms[index] += $ref[item.id][0].$el.offsetHeight + gap;
                        } else {
                            bottoms[index] += 500 + gap;
                        }

                        lines[index].push(item);
                    });
                    this.lines = lines;
                })
            }
        },
        components: {
            card,
        }
    }
</script>

<style lang="scss" src="../scss/notepad.scss"></style>
