export default {
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
            });
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
}
