<template>
   <div class="page-detail">
       <el-row>
           <el-col :span="24">
               <Crumbs :keyword="keyword" :type="type"/>
           </el-col>
       </el-row>
       <el-row>
           <el-col :span="24">
               <Summa :meta="poiInfo" :album="album"/>
           </el-col>
       </el-row>
       <el-row class="m-title">
           <el-col :span="24">
               <h3>商家团购及优惠</h3>
           </el-col>
       </el-row>
       <el-row v-if="canOrder || !login">
           <el-col :span="24">
               <List :list="group" v-if="login"/>
               <div v-else class="deal-need-login">
                    <img src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png" alt="登录查看">
                    <span>请登录后查看详细团购优惠</span>
                    <el-button  type="primary" round>
                        <a href="/login">立即登录</a>
                    </el-button>
                </div>
           </el-col>
       </el-row>
   </div>
   <!-- 并不是组件划分的越细越好。划分的标准是：组件是否可复用。 -->
</template>

<script>
import Crumbs from "@/components/detail/crumbs.vue"
import Summa from "@/components/detail/summary.vue"
import List from "@/components/detail/list.vue"
export default {
   components: {
       Crumbs,
       Summa,
       List,
   },
   computed:{
    canOrder:function(){
      return this.group.filter(item=>item.headIcon.length).length
    }
  },
   async asyncData(ctx){
       let {keyword, type} = ctx.query;
       let{status, data:{group, poiInfo, album}} = await ctx.$axios.get('/mock/detail.json')
       let {status:status2, data: {login}} = await ctx.$axios.get('/search/isSignIn')
       if(status===200 && status2===200) {
           return {
                keyword,
                type,
                poiInfo,
                album,
                group,
                point: [poiInfo.lng, poiInfo.lat],
                login
            }
       }
   }
}
</script>

<style lang="scss">
  @import "@/assets/css/detail/index.scss";
</style>