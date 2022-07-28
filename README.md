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

> 特别要注意的是不要想着使用钩子函数和 生命周期 一一对应，这样理解会导致混乱，钩子函数的执行应该以一种自己的逻辑去理解。

useEffect()钩子函数，可以接收两个参数。第一个是个回调函数，第二个是一个数组。

```js
  useEffect(() => {
    // 1. 执行副作用
    console.log(‘执行副作用’);
    return () => {
      // 2.1 如果effect执行了的话，返回的函数 会在组件更新阶段和卸载阶段被执行（挂载阶段不会被执行）
      // 2.2 一般在这里清除副作用 （比如解决网络请求竞态问题）
      console.log(`${a}，被卸载了`);
    };
 // 3.1. 如果没有添加依赖数组，那么在 挂载阶段 和 更新阶段 ，这个副作用函数都会被执行。
 // 3.2. 如果有添加依赖数组，但依赖数组里没有成员，那么也就是说依赖永远不会改变，如此这个副作用只会在挂载阶段被执行一次。
 // 3.3 如果有添加依赖数组，依赖数组里也有成员，那么这个副作用会在挂载阶段执行；在更新阶段 会根据依赖项是否改变来判断 是否执行副作用。
  }，[]);
```

```js
useEffect(()=>{ 副作用 })   // 副作用在加载阶段 更新阶段 
```

> 特别需要注意，useEffect钩子函数中的第一个回调函数里return的函数，在 `组件更新阶段` 和 `组件挂载阶段` 都会被执行。所以说它模拟了 componentwillunmont是不准确的！很容易误导我们认为他只在卸载阶段才会被执行！

###### useEffect()钩子函数，对比类组件生命周期，有什么优势？

1. 由于useEffect可以多次调用，所以可以按照不同的功能把代码放到不同的useEffect当中了。（生命周期不可用多次调用？）

2. 一个useEffect 可以完成 需要多个 生命周期函数才能完成的事情。

######  useEffect钩子函数第二个参数解决的问题

首先明确问题是：如果一个组件当中存在了很多的状态，那么其中任意一个状态改变了；这时如果没有像useEffect中添加第二个参数，所有useEffect函数都会被执行一次，这肯定不是我们想要的效果。

sueEffect钩子函数的第二个参数就是解决这个问题的，传入一个数组，只有当数组里的成员改变时，才会触发`这个副作用的回调函数`以及触发`上一次回调函数返回的那个函数 `。

useEffect钩子函数结合异步操作

 ```js
 function App(props) {
   useEffect(() => {
     // 要在异步函数里面使用 async await 不能直接把async加载第一个回调函数上
     // 原因时async 函数返回的是一个promise对象， 与effect要求返回函数冲突。
     // 那么在useEffect中要像如下写异步函数(自执行函数)
     (async function () {
       let response = await getData();
       console.log(response);
     })();
   }, []);
 
   return <div>app working</div>;
 }
 ```

# useMemo()钩子函数的使用

作用：

用于监测某个状态的变化，根据状态变化计算出新的结果。

useMemo的使用

调用useMemo钩子函数的时候，需要传递两个参数。第一个参数是一个回调函数，第二个参数是要检测的那个数组。

当你要检测的数组里面的元素发生变化的时候，这个回调函数就会被重新执行了。同理，不变的话，即使组件重新渲染也不重新计算。

useMeno的特点是会缓存计算结果。useMemo钩子函数的返回值，就是它的回调函数被调用后返回的值。

# react中的meno方法

问题场景：

```js
// 我们创建一个新的组件，然后用App组件包裹这个组件。
// 然我们点击按钮，更改count状态，这时App组件会重新渲染。
// 当App组件渲染的时候，它包裹的组件也会重新渲染。不管传递给子组件的状态是否改变。
```

memo作用：

使用memo方法之后，生成一个新组件。新组件有检测机制，当新组建里的状态没有变动时，就不会更新这个组件。这样就优化了性能。

使用方式：直接看代码。

# useCallback()钩子函数

作用：

它能对函数进行缓存，是组件更新后可以得到相同的函数实例。因此它也是做性能优化的（因为缓存了函数）
