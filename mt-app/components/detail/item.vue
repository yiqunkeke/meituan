<template>
   <li class="m-detail-item">
       <dl class="section">
           <dd>
               <img :src="meta.headIcon" :alt="meta.title">
           </dd>
           <dd>
               <h4>{{meta.title}}</h4>
               <p>
                   <span>已售：{{meta.sold}}</span>
                   <span>截止日期：{{meta.deadline}}</span>
                </p>
                <p>
                    <span class="price">{{ meta.price }}</span>
                    <sub>门店价{{ meta.value }}</sub>
                </p>
           </dd>
           <dd>
               <el-button
                    type="warning"
                    round
                    @click="createCart">立即抢购</el-button>
           </dd>
       </dl>  
   </li>
</template>

<script>
export default {
   props: {
       meta: {
           type: Object,
           default: {}
       }
   },
   methods: {
       createCart(){
           
       }
   }
}
</script>

<style scoped>
</style>
