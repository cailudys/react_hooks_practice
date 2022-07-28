# React Hooks 是什么？

hooks本质是函数。

作用是：让开发者在不使用类组件的情况下，能使用类似类组件拥有的功能。比如说`让函数组件拥有存储状态和处理副作用的能力`。

# 什么是副作用？

在一个组件中，只要不是把数据转换成视图的代码，就属于副作用。比如说获取dom元素，为dom元素添加事件，设置定时器，以及发送ajaxi请求等。

在类组件中我们通常使用生命周期函数来处理这些副作用。在函数型组件中我们就需要使用hooks来处理这些副作用。

# 类组件的不足（也是hooks的优势）

1. 缺少组件复用的机制

2. 类组件经常会变得很复杂很难以维护 （一组相关的逻辑要拆分到各个生命周期函数里去；而不相干的逻辑经常要写在同一个生命周期函数中）

3. 类成员方法不能保证this指向的正确性。

# useState()钩子函数

这个函数的功能，是为了让函数型组件，能够保存组件状态。

在我们现有的认知里，一个函数里面的变量，在这个函数被执行完成之后，里面的变量就会被释放掉了。所以函数组件原本是不可用保存状态数据的。

useState()钩子函数内部是使用闭包来保存状态的。

###### useState()钩子函数细节总结：

> 1. useState()钩子函数只接收一个参数；这个参数可以是一个`任意类型的值`也可以是一个`函数`；
> 2. 当往useState()钩子函数中传递一个函数时；这个函数的返回值就会被设置为此状态的初始值；且这个函数只会在组件挂载阶段被执行一次。
> 3. 钩子函数返回值为一个数组，数组中存储了`状态值`和`更改状态值的方法`。方法约定以set开头。

###### 往useState()中传递函数的场景 （初始状态时外部传递过来的）

```js
// 这是一个App组件
function App(props) {
  // 假如初始值不确定，是外部传过来的。我们可以如下写：
  const propsCount = props.count || 0;
  // 这样写有个问题，每当点击之后，这个App函数会重新执行一次，所以上面那段代码每次渲染也会被重新执行
  // 这样是完全没有意义的
  const [count, setCount] = useState(propsCount);
  useEffect(() => {
    console.log(count);
  });
  return (
    <div>
      <span>{count}</span>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +1
      </button>
    </div>
  );
}

export default App;

```

```js
function App(props) {
  // 传递到useState中的函数只会在组件被挂载时执行一次。
  const [count, setCount] = useState(()=>{
      return props.count || 0;
  });
  ....
}
```

###### 重点理解

> 下面代码中的组件，第一次点击按钮，打印出来的是 初始状态 0 而不是 setCount之后的状态 1 。

```js
function App(props) {
  const [count, setCount] = useState(() => {
    return props.count || 0;
  });
  return (
    <div>
      <span>{count}</span>
      <button
        onClick={() => {
          setCount(count + 1);
          // 每一次渲染，都相当于重新执行一次组件函数，每次组件函数都拥有属于它那一份的状态。
          // 需要理解的是，当前这次渲染中设置的状态，得到下一次渲染才能拿到。当前这次渲染拿到的是上一次设置的状态，或者是初始状态。
          console.log(count);
        }}
      >
        +1
      </button>
    </div>
  );
}
```

###### 设置状态时的细节点

当我们设置状态时，我们可以之间传入一个值；也可以传入一个回调函数。

当我们传递回调函数，setCount调用回调函数的时候会往回调函数中传入一个参数：这个参数指的时当前这次渲染时的状态。这个函数的返回值会用来更新状态。

> 我们没有办法在当前渲染过程中`直接拿到`当前渲染过程中设置的状态。
>
> setCount（）本身是同步的，在合成事件函数中体现出来的样子是异步的。导致这样的原因是React的运行机制造成的。

# useReducer()钩子函数

作用：是另一种让函数组件保存状态的方式。

优点：不需要向子组件传递修改数据的方法，子组件使用dispacth触发action即可。

# useContext()钩子函数

作用：是用来简化代码的，当我们使用context跨组件层级传递数据时，简化获取数据的代码。

###### 最初的使用context跨组件层级传递数据

```js
import React, { createContext, useContext } from "react";

// 实例化一个context对象
const countContext = createContext();

function App(props) {
  return (
    <countContext.Provider value={100}>
      <Foo></Foo>
    </countContext.Provider>
  );
}

// 
// Foo子组件 获取context中的内容
function Foo(props) {
  return (
    <countContext.Consumer>
      {(value) => {
        // 在这个函数里里可以获取到数据，视图也要在这里return出去
        return <div>{value}</div>;
      }}
    </countContext.Consumer>
  );
}

export default App;
```

###### 使用useContext()钩子函数简化代码后的

```js
import React, { createContext, useContext } from "react";

// 实例化一个context对象
const countContext = createContext();

function App(props) {
  return (
    <countContext.Provider value={100}>
      <Foo></Foo>
    </countContext.Provider>
  );
}

// Foo子组件 获取context中的内容
function Foo(props) {
   // 每次渲染都会重新获取一遍 value，所以没有问题。
  const value = useContext(countContext);
  return <div>{value}</div>;
}

export default App;
```

# useEffect()钩子函数

作用：让函数型组件拥有处理副作用的能力，类似于类组件的生命周期 【仅仅是类似而已，要明确区分两者的不同】





熟悉xdigit项目代码和项目里使用到的技术栈。
