<template>
  <div class="m-product-select">
    <dl class="tab">
      <dt>{{ name }}<i class="el-icon-arrow-down el-icon--right"/></dt>
      <dd>
        <h3>{{ name }}</h3>
        <span
          v-for="(item, idx) in list"
          :key="idx">{{ item.name }}</span>
      </dd>
    </dl>
  </div>
  <!-- 总结：
            1. 先设计DOM结构 
            2. 再设计数据结构
              (这里的数据结构是前端定义的：
                原则：前端要有自己的数据结构。后端有它的数据结构。
                好处：前端完全不依赖于后端的数据结构。
                纽带：前端从后端通过接口把数据拿回来之后，把后端的数据与前端的数据做一个js映射。不涉及DOM结构里面操作。这样非常好。
                      改Json映射关系是很容易的，改模板（DOM）结构是非常痛苦的。
              )
  -->
</template>

<script>
export default {
  props: {
    name: {
      type:String,
      default:''
    },
    list: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>
