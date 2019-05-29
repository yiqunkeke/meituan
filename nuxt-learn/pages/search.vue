<template>
   <div class="page">
       Page is search
       <ul>
           <li v-for="(item, idx) in list" :key=idx>
               {{item}}
           </li>

           <!-- 从 store 中读取数据$store.state.模块名.字段名 -->
           <!-- store中的数据，同样是在服务端渲染完成，同时也会把数据下发到浏览器一份 -->

           <!-- <li v-for="(item, idx) in $store.state.city.list" :key=idx>
               {{item}}
           </li> -->
       </ul>
   </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios"
export default {
   layout: 'search',
   data() {
       return {
           list: []
       }
   },
   // 1. 浏览器端渲染
//    async mounted() {
//        // mounted 函数在服务器端是不会执行的---服务端只有 created()
//        let self = this
//        let {status, data: {list}} = await axios.get('/city/list')
//        if(status==200) {
//            self.list = list
//        }
//        // 所以，这段数据渲染的过程，只在浏览器端进行:
//        // 在把内容下发到浏览器之后，在页面上会有数据出现。

//        // 但是，下发的内容中（查看源代码），并没有数据。
//        // 总结：数据在下发的过程中并没有渲染进去。
//    }

    // 2. SSR
    async asyncData() {
        // asyncData()--请求异步数据，发生在服务端的Render之前。---用来处理组件数据
        let {status, data: { list }} = await axios.get('http://localhost:3000/city/list')
        if(status === 200) {
            return { list }
        }
        // SSR原理总结：1.使用asyncData(), 数据渲染是在服务器端完成。（查看源代码，可以看到li里面有数据）
        //             2. 下发时，会把请求到的异步数据，单独下发到浏览器一份。  （重点！！！）
    },

    // 3. 使用 vuex 中的数据渲染
    // async fetch() {
    //     // fetch()--请求到的异步数据，主要用来处理vuex相关的事情。---fetch()处理组件数据是无效的
    //     let {status, data: { list }} = await axios.get('http://localhost:3000/city/list')
    //     if(status === 200) {
    //         return { list }
    //     }
    // }
}
</script>

<style scoped>
</style>
