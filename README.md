# ReactNativeTetris
俄罗斯方块ReactNative版本的练手项目，
项目是参考和学习大神的react项目[react-tetris](https://github.com/chvin/react-tetris)而来，第一次见到时十分震惊和羡慕。终于在近期公司要求学习TypeScript的档口，又是年后这个相对清闲一点，于是就想用这个来练手。
## 效果预览
![操作演示]()

## 练手目标
用ReactNative实现react-tetris中的所有目标，如音效，持久化保存等。此外新的目标就是使用TypeScript来实现

## 技术栈
ReactNative + Redux + TypeScript + 少量的Immutable

## 对TypeScript的一些体会
### 安全感与舒适感
类型安全的TypeScript给我开发中带来了JS没有的安全感，在编码过程中可以第一时间发现类型调用的错误，极大减少了调试错误，重构也非常方便，可以在开发过程中随时根据需要立刻进行安心的重构工作。
此外TypeScript的代码补全也非常好用，相对TS提高了编码的速度，提高了舒适感。
### 好用的泛型
在实际开发中对于Action和Reducer我们经常感觉在写格式雷同的重复代码。当state字段定义过多时，这样做会很烦，TypeScript的泛型让代码变得简洁清晰。一个泛型函数搞定所有的雷同action函数定义。
```` ts
export let actionCreator = <T>(type: string, initData?: T, actionHandle = (action: Action<T>)=>{}) => (data = initData) => {    
    let action: Action<T> = {
        type,
        data: data as T,
    }
    actionHandle && actionHandle(action)
    return action
}
````

```` ts
export default {
    nextBlock: actionCreator<BlockType>(NEXT_BLOCK, MatrixManager.getNextType()),
    moveBlock: actionCreator_1<TetrisBlockOption>(MOVE_BLOCK),
    startLines: actionCreator(START_LINES, 0),
    matrix: actionCreator<List<List<MatrixPoint>>>(MATRIX),
    clearLines: actionCreator(CLEAR_LINES, 0),
    points: actionCreator(POINTS, 0),
    max: actionCreator(MAX, 0),
    pause: actionCreator(PAUSE, false),
    reset: actionCreator(RESET, false),
    lock: actionCreator(LOCK, false, (action)=>{
        if (action.data == true) {
            MusicManager.bgm()            
        }
    }),
    music: actionCreator(MUSIC, true),
    speedStart: actionCreator(SPEED_START, 0),
    speedRun: actionCreator(SPEED_RUN, 0),
};
````

### 通过黑科技让Redux的State类型清晰
利用TypeScript强大的类型推断能力，我们可以从reducer中动态获取当前state是什么样的数据类型。让JS中state和reducer这种模糊的对应关系直接清晰呈现。具体的效果大家可以翻看reducer的index.ts 和 container.tsx查看效果。关键代码如下
```` ts
//从reducer集合中推导出求得state的空mock数据
function returnType<FullState>(reducersMap: Reducer<FullState, any>): FullState {
  return {} as FullState;
}
````


## RN渲染优化
RN的渲染优化本质上和react的渲染优化并无区别，但是由于RN相当于是React的子集实现，实际上并不是React上所有的渲染优化工具都适合RN来使用.
[React性能优化——工具篇](http://wulv.site/2017-07-01/react-perf-tools.html)中提到了以下5个React性能优化的工具。
1. React Developer Tools for Chrome
2. Chrome Performance Tab
3. react-addons-perf
4. why-did-you-update
5. react-perf-tool
对于1，2 我认为并不适用于RN端。3是React 官方推出的一个性能工具包，我没有实际使用过了大家可以试试。
我重点要说的是why-did-you-update这款工具，对于RN十分好用。它就是专门针对shouldComponentUpdate进行优化的工具。它会比较组件的 state 和 props 的变化，如果两次渲染值是没有改变的，会提示去避免re-render。
![](https://camo.githubusercontent.com/0f34a575ad3f81c9826f54c03a17da848e1ee038/687474703a2f2f692e696d6775722e636f6d2f556938595542652e706e67)