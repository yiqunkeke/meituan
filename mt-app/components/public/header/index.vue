<template>
  <el-row
    :gutter="15"
    class="m-header">
    <el-col :span="6">
      <Geo/>
    </el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
</template>

<script>
  import Geo from './geo'
    export default {
        name: "index.vue",
      components: {
          Geo
      }
    }
</script>

<style scoped>

</style>
