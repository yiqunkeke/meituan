<template>
   <dl class="s-item">
    <dt>
      <img :src="meta.imageUrl" alt="商品图片">
    </dt>
    <dd>
      <h3><nuxt-link :to="{path:'detail',query:{keyword:meta.title,type:meta.showType,id:meta.id}}">{{ meta.title }}</nuxt-link></h3>
      <el-rate v-model="meta.avgscore" :colors="['#ff9900', '#ff9900', '#FF9900']" disabled/>
      <span v-if="meta.avgscore>4" class="s-item-comment">很好</span>
      <span v-else-if="meta.rate>3" class="s-item-comment">一般</span>
      <span v-else class="s-item-comment">很差</span>
      <span class="s-item-value">{{ meta.avgscore }}分</span>
      <span class="s-item-comment-total">{{ meta.comments }}人评论</span>
      <p>
        <span class="s-item-type">{{ meta.backCateName + '|' + meta.areaname }}</span>
        <span class="s-item-addr">{{ meta.address }}</span>
      </p>
      <p>
        <em class="s-item-price">￥{{ meta.lowestprice }}起</em>
        <b>查看地图</b>
      </p>
      <ul>
        <li v-for="(item, idx) in meta.deals" :key="idx">
          <span class="detail-type">门票</span>
          {{item.title}}
        </li>
        <!-- <li>
          <span class="detail-type">跟团</span>{{meta.group}}
        </li>
        <li v-if="meta.scene&&meta.scene.length">
          <span class="detail-type">景酒</span>{{ meta.scene }}
        </li>
        <li v-else>
          <span class="detail-type">景酒</span>暂无描述
        </li> -->
      </ul>
    </dd>
  </dl>
</template>

<script>
export default {
   props: {
       meta: {
           type: Object,
           default() {
               return {}
           }
       }
   }
}
</script>

<style scoped>
</style>
