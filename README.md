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