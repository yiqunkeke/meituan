<template>
   <div class="">
   </div>
</template>

<script>
export default {
   layout: 'blank',
   middleware: async (ctx) => {
       // 利用中间件来实现退出---让用户到达页面时，自动执行
       let { status, data } = await ctx.$axios.get('/users/exit');
       if(status===200 && data && data.code===0) {
           window.location.href="/"
       }
   }
}
</script>

<style scoped>
</style>
