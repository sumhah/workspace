<template>
    <div id="app" class="app">
        <div class="content">
            <TransitionGroup
                v-for="(line,i) in lines"
                :key="i"
                name="fade"
                tag="div"
                class="line"
            >
                <Card
                    v-for="(item) in line"
                    v-show="item.text.includes(searchText)"
                    :key="item.id"
                    :ref="item.id"
                    :item="item"
                />
            </TransitionGroup>
        </div>
        <div class="menu-bar">
            <AddIcon @click="$store.commit('addCard')" />
            <SearchBar />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'App',
    data() {
        return {
            currentState: 0,
            lines: [[], []],
        };
    },
    computed: {
        ...mapState(['searchText', 'cardList'])
    },
    watch: {
        cardList() {
            this.$nextTick(() => {
                const bottoms = [0, 0];
                const gap = 26;
                const lines = [[], []];
                const $ref = this.$refs;
                this.cardList.forEach((item) => {
                    const index = bottoms[0] - 20 > bottoms[1] ? 1 : 0;
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
    created() {
        if (localStorage.getItem('data')) {
            this.$store.commit('cardListInit', JSON.parse(localStorage.getItem('data')));
        }
        window.addEventListener('beforeunload', () => localStorage.setItem('data', JSON.stringify(this.cardList)));
    },
    mounted() {
        // this.clearData();
    },
    methods: {
    },
};
</script>

<style lang="scss" src="../scss/notepad.scss"></style>
