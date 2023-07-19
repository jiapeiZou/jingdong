import axios from 'axios' // 引入请求工具

// 相同的 基本URL 头信息
const instance = axios.create({ // 创建一个axios 实例，该实例存放 在发送请求时总是使用相同的基本 URL 和头信息，下面就不调用axios.post()/axios.get(), 应该用instance.get()
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  timeout: 10000
})

// 发送post请求
export const post = (url, data = {}) => { // 定义一个变量，接收2个参数 一个路径 一个你要传送的内容（当没有参数需要传递时，data为空对象.
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json' // 后端要求的 请求content的数据类型
      }
    }).then(
      response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}

// 发送get请求
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((response) => {
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}
// export 用于从一个模块导出函数、对象或原始值，使其他模块可以通过 import 语句来使用它们

// Promise 是一个构造函数，可以进行对象的实例化。它接收一个参数（函数类型的值），函数有两个形参resolve(解决) ,reject（拒绝）
// 异步操作可能未来的完成 或失败 及其结果值的对象。
// const p = new Promise(（resolve,reject）=>{ 异步操作代码 } )

// Promise解析后，可以调用 then 方法. 执行时需要接收两个参数（参数必须为函数类型的值）
// 第一个参数 对象成功时的回调/ 第二个参数 是对象失败时回调
// p.then( ()=>{ resolve() }, ()=>{ reject() } )
