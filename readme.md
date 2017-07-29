# 作用
用于时间埋点，计算统计耗时

底层用一个 `Map` 来存储所有被记录的时刻，每个被记录的时刻有唯一的名称即`markName`。
`Map` 的 `key` 为`markName`，`value` 为自1970年1月1日 00:00:00 UTC到被记录时刻的毫秒数。


# 使用示例
```javascript
 import timeStatistics from 'time-statistics';   //引入

 timeStatistics.mark('firstFocus');  //记录输入框第一次聚焦的时刻

 timeStatistics.mark('firstBlur');  //记录输入框第一次失焦的时刻

 let _time = timeStatistics.measure('firstFocus'); //记算耗时：从第一次聚焦时刻至当前时刻的时间间隔

 let _time = timeStatistics.measure('firstFocus', 'firstBlur'); //记算耗时：从第一次聚焦至第一次失焦的时间间隔

 timeStatistics.clearMarks('firstFocus');  //清空第一次聚焦的时刻

 timeStatistics.clearMarks();  //清空所有记录的时刻
 ```

# API 说明

一共提供了3个接口：`mark`、 `measure`、 `clearMarks`。
所有接口的设计参考了 [user performance 规范](https://www.w3.org/TR/user-timing/)。

1. `statisticTiming.mark(markName)` 
    作用：
        标记函数，用来记录当前时刻

    参数：
        - `markName`
            - 必填
            - 当前时刻的标记名称
            - 类型：`string`
    返回值：自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
        
    注意: 当多次调用`mark`方法时传入同一个`markname`值，只会记录最后一次调用的时刻 

2. `statisticTiming.measure(startMark, endMark)` 
    作用：
        计算耗时函数，计算起始标记时刻之间的时间间隔
        
    参数：
        - `startMark`
            - 必填
            - 开始时刻的 `markName`
            - 类型：`string`
        - `endMark`
            - 选填
            - 结束时刻的 `markName`
            - 类型：`string`
    返回值：
        - 若 `startMark` 与 `endMark` 都存在时，则返回 `endMark` 与 `startMark` 的时间间隔（毫秒数）；
        - 若仅 `startMark` 存在，而 `endMark` 不存在，则返回当前时刻与 `startMark` 的时间间隔（毫秒数）；

3. `statisticTiming.clearMarks(markName)`
    作用：
        清空函数，若`markName`存在，则清空某个标记时刻; 若`markName`不存在，则清空所有标记时刻

    参数:
        - `markName`
            - 选填
            - 要清空时刻的标记名称
            - 类型：`string`
    返回值: 
        - 无



