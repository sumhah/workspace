const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

/**
 * 最终目标: 任何行为通过代码来产生，不需要思考
 * 决策与行为分离
 */

export default class Manager {
    constructor() {
        this.things = [
            {
                content: '剪脚指甲',
                type: '身体',
                location: '家',
                cycle: 30 * day,
                weight: 20,
                result: '整洁度',
                lastTime: Date.now(),
            },
            {
                content: '剪手指甲',
                type: '身体',
                location: '家',
                cycle: 20 * day,
                weight: 20,
                result: '整洁度',
                lastTime: Date.now(),
            },
            {
                content: '理发',
                type: '身体',
                location: '家',
                cycle: 30 * day,
                weight: 20,
                result: '整洁度',
                lastTime: Date.now(),
            },
        ];
    }

    receive() {

    }
}
