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
       <el-row>
           <el-col :span="19">
               <List :list="group"/>
           </el-col>
           <el-col :span="5">
               <Map v-if="point.length"
                    :width="230"
                    :height="290"
                    :point="point"/>
           </el-col>
       </el-row>
   </div>
   <!-- 并不是组件划分的越细越好。划分的标准是：组件是否可复用。 -->
</template>

<script>
import Crumbs from "@/components/detail/crumbs.vue"
import Summa from "@/components/detail/summary.vue"
import List from "@/components/detail/list.vue"
import Map from "@/components/public/map.vue"
export default {
   components: {
       Crumbs,
       Summa,
       List,
       Map,
   },
   async asyncData(ctx){
       let {keyword, type} = ctx.query;
       let{status, data:{group, poiInfo, album}} = await ctx.$axios.get('/mock/detail.json')
       if(status===200) {
           return {
                keyword,
                type,
                poiInfo,
                album,
                group,
                point: [poiInfo.lng, poiInfo.lat]
            }
       }
   }
}
</script>

<style lang="scss">
  @import "@/assets/css/detail/index.scss";
</style>