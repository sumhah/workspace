<template>
    <div id="app" class="app">
        <div class="content">
            <TransitionGroup
                name="fade"
                tag="div"
                class="line"
                v-for="(line,i) in lines"
                :key="i"
            >
                <Card
                    :item="item"
                    :key="item.id"
                    :ref="item.id"
                    v-show="item.text.includes(searchText)"
                    v-for="(item, i) in line"
                ></Card>
            </TransitionGroup>
        </div>
        <div class="menu">
            <AddIcon></AddIcon>
            <SearchBar></SearchBar>
        </div>
    </div>
</template>

<script>
    import Card from '@/components/card';
    import AddIcon from '@/components/add-icon'
    import SearchBar from '@/components/search-bar'
    import {mapState} from 'vuex'

    export default {
        name: 'app',
        data() {
            return {
                currentState: 0,
                lines: [[], []],
            };
        },
        methods: {
        },
        computed: {
            ...mapState(['searchText', 'cardList'])
        },
        created() {
            if (localStorage.getItem('data')) {
                this.$store.commit('cardListInit', JSON.parse(localStorage.getItem('data')))
            }
            window.addEventListener('beforeunload', () => localStorage.setItem('data', JSON.stringify(this.cardList)))
        },
        mounted() {
            // this.clearData();
        },
        watch: {
            cardList() {
                this.$nextTick(() => {
                    let bottoms = [0, 0];
                    const gap = 26;
                    const lines = [[], []];
                    const $ref = this.$refs;
                    this.cardList.forEach((item) => {
                        let index = bottoms[0] - 20 > bottoms[1] ? 1 : 0;
                        if ($ref[item.id]) {
                            bottoms[index] += $ref[item.id][0].$el.offsetHeight + gap;
                        } else {
                            bottoms[index] += 500 + gap;
                        }

                        lines[index].push(item);
                    });
                    this.lines = lines;
                });
            },
        },
        components: {
            Card,
            SearchBar,
            AddIcon,
        },
    };
</script>

<style lang="scss" src="../scss/notepad.scss"></style>
