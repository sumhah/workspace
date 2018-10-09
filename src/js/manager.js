const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const week = 7 * day;
const month = 30 * day;
const year = 365 * day;

/**
 * 最终目标: 任何行为通过代码来产生，不需要思考
 * 决策与行为分离
 */

/**
 * 任意方向所做的努力与获得的收益等距
 */

/**
 * 标签:
 *
 * 1.地点: 公司 宿舍 室外
 * 2.类别: 体质 知识 社交
 *
 *
 * 任务可以设定任意多的标签和属性， 过滤器自动根据数据来生成可供选择的过滤项
 *
 * 3.实际任务
 * 编程：
 * html、css、javascript、webpack、git、
 *
 */

export default class Manager {
    constructor() {
        this.things = [
            {
                content: 'javascript',
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
