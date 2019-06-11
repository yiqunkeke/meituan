<template>
   <div class="">
       <dl class="m-categroy">
           <dt>按拼音首字母选择：</dt>
           <dd v-for="item in list" :key="item">
               <a :href="'#city-'+item">
                   {{item}}
               </a>
           </dd>
       </dl>

       <dl v-for="item in block" :key="item.title" class="m-categroy-section">
           <dt :id="'#city-'+ item.title">{{item.title}}</dt>
           <dd>
               <span v-for="c in item.city" :key="c">{{c}}</span>
           </dd>
       </dl>

   </div>
</template>

<script>
import pyjs from 'js-pinyin'; // 这个库可以解决：汉语到拼音的转换
export default {
   name: '',
   data() {
       return {
           list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
           block:[]
       }
   },
   async mounted(){
       let self = this;
       let blocks = []
       // 获取-全国所有城市
       let {status, data: {city}} = await self.$axios.get('/geo/city')
       if(status===200) {
           let p // 城市的拼音首字母，如“安阳”---> a
           let c
           let d = {} // 每个拼音字母对应的数组
           city.forEach(item =>{
               // getFullChars() 是 js-pinyin 库提供的方法，可以拿到全拼。
               // 再使用 .toLocaleLowerCase() 转换为小写
               // 最后使用 .slice() 截断处理：只取首字母
               p = pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0, 1) // p: 城市的拼音首字母，如“安阳”---> a
               c = p.charCodeAt(0) // c:首字母p的code值
                // 'a'.charCodeAt(0)--->97
                // 'z'.charCodeAt(0)--->122
                // 'A'.charCodeAt(0)--->65
                // 'Z'.charCodeAt(0)--->90
               if(c>96&&c<123){
                   if(!d[p]){ 
                       d[p]=[]
                   }
                   d[p].push(item.name)
               }
           })
           // 从临时对象d--->转为数组
           for(let [k,v] of Object.entries(d)) {
               blocks.push({
                   title: k.toUpperCase(),
                   city:v
               })
           }
           // 因为从接口拿到的数据是没有顺序的，不是从A-Z顺序，所以还需要进行排序处理
           blocks.sort((a,b)=>a.title.charCodeAt(0)-b.title.charCodeAt(0))
           // 赋值
           self.block = blocks
       }
   }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/categroy.scss";
</style>
