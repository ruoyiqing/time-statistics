export class StatisticTiming {
    constructor() {
        this.markMap = new Map(); //key:markName; value: timestamp
    }

    /**
     * 标记函数：用来记录当前时刻
     *
     * @param markName  必填参数，标记名称
     */
    mark(markName){
        if(typeof markName !== 'string'){
            console.error("SYNTAX_ERR: missing markName which should be string!");
            return;
        }
        this.markMap.set(markName, Date.now());
        return this.markMap.get(markName);
    }

    /**
     * 清空标记函数：删除之前记录的标记
     * 如果没有 markName ：清空所有 mark
     * 如果有 markName : 存在则只清空一个，不存在什么都不做
     *
     * @param markName   标记名称
     */
    clearMarks(markName){
        if(typeof markName === 'undefined'){
            this.markMap = new Map();
            return;
        }
        if(typeof markName !== 'string'){
            console.error("SYNTAX_ERR: markName must be string!");
            return;
        }
        if(this.markMap.has(markName)){
            this.markMap.delete(markName);
        }
    }

    /**
     * 计算耗时函数：计算两个标记时刻之间的时间间隔,或当前时刻与某个标记时刻之间的时间间隔
     *
     * @param startMark 必填  开始时刻的标记
     * @param endMark  选填   结束时刻的标记
     */
    measure(startMark, endMark){
        if(typeof startMark !== 'string'){
            console.error("SYNTAX_ERR: missing startMark which should be string!");
            return 0;
        }
        if(!this.markMap.has(startMark)){
            console.error(`SYNTAX_ERR: startMark[${startMark}] 不存在！`);
            return 0;
        }
        if(endMark && !this.markMap.has(endMark)){
            console.error(`SYNTAX_ERR: endMark[${endMark}] 不存在！`);
            return 0;
        }
        let endTime = endMark ? this.markMap.get(endMark) : Date.now();
        return endTime - this.markMap.get(startMark);
    }
}

let _statisticTiming = new StatisticTiming(); //保证只有一个实例对象
export default _statisticTiming;
