<template>
   <div class="m-products-list">
       <dl>
           <dd  v-for="(item, idx) in nav" 
                :key="idx" 
                :class="[item.name, item.active ? 's-nav-active':'']"
                @click="sort(item, idx)"
           >
               {{item.txt}}
           </dd>
           <!-- 深刻理解-组件化：就是用模板和数据来拼组件。而不是靠模板去写。-->
       </dl>
       <ul>
           <!--把 Item单独写成组件的原因：
                1. 它与数据强耦合； 
                2. 可复用的
            -->
            <Item
                v-for="(item, idx) in list"
                :key="idx"
                :meta="item"/>
        </ul>
        <!-- 外层容器 ul 是与数据解耦的。 -->


        <!--总结：根据页面，如何做组件的设计、划分、功能的解耦 -->
   </div>
</template>

<script>
import Item from './product.vue';
export default {
   components: {
       Item
   },
   props: {
       list: {
           type: Array,
           default() {
               return []
           }
       }
   },
   data() {
       return {
           nav: [
                    {
                    name: 's-default',
                    txt: '智能排序',
                    active: true
                    }, 
                    {
                    name: 's-price',
                    txt: '价格最低',
                    active: false
                    }, 
                    {
                    name: 's-visit',
                    txt: '人气最高',
                    active: false
                    },
                    {
                    name: 's-comment',
                    txt: '评分最高',
                    active: false
                    }
                ]
       }
   },
   methods:{
       // 作业：实现数组排序
       sort(item, idx){
           // nav 中其它项，去掉激活样式
           this.nav = this.nav.map(item => {
               return {
                   name: item.name,
                   txt: item.txt,
                   active: false
               }
           });
           // 找到nav中当前项，【filter()返回的是一个数组，故使用[0]取得当前项。并改变当前项为激活样式】
           this.nav.filter(i=>i.name===item.name)[0].active = true; 
           
           // 智能排序--平均价格
           if(item.name === 's-default'){
               this.list.sort((a, b) => a.avgprice - b.avgprice);
           }
           // 价格最低排序
           if(item.name === 's-price'){
               this.list.sort((a, b) => a.lowestprice - b.lowestprice);
           }
           // 人气最高排序
           if(item.name === 's-visit'){
               this.list.sort((a, b) => b.comments - a.comments);
           }
           // 评价最高排序
           if(item.name === 's-comment'){
               this.list.sort((a, b) => b.avgscore - a.avgscore);
           }
       }
   }
}
</script>

<style>
</style>
