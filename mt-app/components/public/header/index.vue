<template>
  <el-row
    :gutter="0"
    class="m-header">
    <el-col :span="6">
      <Geo />
    </el-col>
    <el-col :span="6">
      <User />
    </el-col>
    <el-col :span="12">
      <Navbar />
    </el-col>
  </el-row>
</template>

<script>
import Geo from './geo.vue'
import User from './user.vue'
import Navbar from './nav.vue'
export default {
  name: 'index.vue',
  components: {
    Geo,
    User,
    Navbar
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/public/layout.scss';
</style>
