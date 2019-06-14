<template>
   <div class="page-cart">
       <el-row>
           <el-col v-if="cart.length" :span="24" class="m-cart">
               <List :cartData="cart"/>
               <p>
                   应付金额：<em class="money">￥{{total}}</em>
                </p>
                <div class="post">
                    <el-button type="primary" @click="submit">
                        提交订单
                    </el-button>
                </div>
           </el-col>
           <el-col v-else class="empty">购物车为空</el-col>
       </el-row>
   </div>
</template>

<script>
import List from '@/components/cart/list.vue'
export default {
   components:{
       List
   },
   computed:{
       total(){
           let total = 0;
           this.cart.forEach(item=>{
               total += item.price * item.count
           })
           return total;
       }
   },
   methods:{
       async submit(){
           // 创建订单
           let {status, data: {code, id}} = await this.$axios.post('/order/createOrder', {
               id:this.cartNo,
               price: this.cart[0].price,
               count: this.cart[0].count,
           })

           if(status===200 && code===0) {
               this.$message({
                    message: `恭喜您，已成功下单，订单号:${id}`,
                    type: 'success'
                });
               location.href='/order'
           } else {
               this.$message.error('下单失败');
           }
           
       }
   },
   async asyncData(ctx){
       // 获取购物车
       let {status, data:{code, data: {name, price, imgs}}} = await ctx.$axios.post('/cart/getCart', {
           id: ctx.query.id
       })

       if(status===200 && code===0 && name) {
           return {
               cart: [
                   {
                       name,
                       price,
                       imgs,
                       count: 1
                   }
               ],
               cartNo: ctx.query.id
           }
       }
   }
}
</script>

<style lang="scss">
    @import "@/assets/css/cart/index.scss"
</style>
