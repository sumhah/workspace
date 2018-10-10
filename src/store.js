import Vue from 'vue';
import Vuex from 'vuex';
import stringSimilarity from 'string-similarity';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        searchText: '',
        cardList: [],
    },
    mutations: {
        searchTextChange(state, val) {
            state.searchText = val
        },
        cardListInit(state, val) {
            state.cardList = val
        },
        addCard(state) {
            state.cardList.push({
                text: '',
                checkNumber: 0,
                createTime: Date.now(),
                modifyTime: Date.now(),
                id: Date.now() + (Math.random() * 10000).toFixed(0),
            });
        },
        removeCard(state, item) {
            const cardList = state.cardList;
            cardList.splice(cardList.indexOf(item), 1);
        },
        relateTime(state, coreItem) {
            state.cardList.sort((item1, item2) => Math.abs(coreItem.createTime - item1.createTime) - Math.abs(coreItem.createTime - item2.createTime));
        },
        relateText(state, coreItem) {
            state.cardList.sort((item1, item2) => {
                //                    return this.contentSimilarity(coreItem, item2) - this.contentSimilarity(coreItem, item1);
                return stringSimilarity.compareTwoStrings(coreItem.text, item2.text) - stringSimilarity.compareTwoStrings(coreItem.text, item1.text);
            });
        },
        clearData(state) {
            state.cardList = []
        },
    },
})
