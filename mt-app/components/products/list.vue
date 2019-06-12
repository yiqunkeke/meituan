<template>
   <div class="m-products-list">
       <dl>
           <dd  v-for="(item, idx) in nav" 
                :key="idx" 
                :class="[item.name,item.acitve?'s-nav-active':'']"
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
                    acitve: true
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
                    txt: '评价最高',
                    active: false
                    }
                ]
       }
   }
}
</script>

<style scoped>
</style>
