<template>
   <dl class="m-sum-card">
       <dt>
           <h1>{{meta.name}}</h1>
           <el-rate v-model="meta.score" disabled/>
           <span>{{ meta.score }}分</span>
           <span>人均￥{{ meta.avgPrice }}</span>
           <ul>
                <li>地址：{{ meta.address }}</li>
                <li>电话：{{ meta.phone }}</li>
                <li>营业时间：{{meta.openTime}}</li>
            </ul>
       </dt>
       <dd>
        <el-carousel
            height="214px"
            indicator-position="none">
            <el-carousel-item
            v-for="(item,idx) in album"
            :key="idx">
            <h3><img
                :src="item.url"
                :alt="item.imgDesc"
                width="100%"
                height="100%"></h3>
            </el-carousel-item>
        </el-carousel>
        </dd>
   </dl>
</template>

<script>
export default {
   props: {
       meta: {
           type: Object,
           default: {}
       },
       album: {
           type: Array,
           default: {}
       }
   }
}
</script>

<style scoped>
</style>
