<template>
    <el-row class="page-product">
           <el-col :span="19">
               <Crumbs :keyword="keyword"/>
               <Categroy :types="types" :areas="areas"/>
               <List :list="list"/>
           </el-col>
           <el-col :span="5">
               <!-- 地图功能与数据解耦。（它只需要经度和纬度）。所以做成公共功能模块 -->
               <Map v-if="point.length"
                    :width="230"
                    :height="290"
                    :point="point"/>
           </el-col>
    </el-row>       
</template>

<script>
import Crumbs from '@/components/products/crumbs.vue'
import Categroy from '@/components/products/categroy.vue'
import List from '@/components/products/list.vue'
import Map from '@/components/public/map.vue'
export default {
  components: {
      Crumbs,
      Categroy,
      List,
      Map
  },
  data(){
      return {
          keyword:'', // 搜索关键字
          types: [], // 分类
          areas: [],  // 区域
          list: [], // 产品
          point: [] // 地图
      }
  },
  async asyncData(ctx) {
      let keyword = ctx.query.keyword
      let {status, data: { category, area, city, list }} = await ctx.$axios.get('/mock/products.json')
      //   console.log(category);
      if(status===200) {
        return {
                keyword,
                types: category,
                areas: area,
                point: [city.position.lng, city.position.lat],
                list
            }
      }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/products/index.scss";
</style>
