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
       // 创建购物车
       async createCart(){
           let self=this;
           let {status, data:{code, id}} = await this.$axios.post('/cart/create', {
               params: {
                   id: Math.random().toString().slice(3,9), // 随机生成id
                   detail: {
                       name: self.meta.title,
                       price: self.meta.price,
                       imgs: self.meta.headIcon
                   }
               }
           })
           if(status===200&&code===0){
                window.location.href=`/cart/?id=${id}`
            }else{
                console.log('error')
            }
       }
   }
}
</script>

<style scoped>
</style>
