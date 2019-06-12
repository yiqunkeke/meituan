<template>
   <div class="m-product-categroy">
       <dl class="classic">
           <dt>分类</dt>
           <dt>全部</dt>
           <dd>        
                <!-- 把iselect抽象成组件的原因：
                        1. 可复用
                        2. 与数据紧密结合（强耦合）
                  -->
                <iselect
                    v-for="(item, idx) in types" :key="idx"
                    :name="item.name"
                    :list="item.children"/>           
           </dd>
       </dl>
       <dl class="classic">
           <dt>区域</dt>
           <dt>全部</dt>
           <dd>
               <iselect 
                    v-for="(item, idx) in areas" :key="idx"
                    :name="item.name"
                    :list="item.children"/>
           </dd>
       </dl>
   </div>
</template>

<script>
import iselect from './iselect.vue';
export default {
    components: {
        iselect
    },
    props: {
       types: {
           type: Array,
           default(){
               return []
           }
       },
       areas: {
           type: Array,
           default(){
               return []
           }
       }
   }
}
</script>

<style lang="scss">
//   .m-product-categroy{
//     padding: 15px 20px 0;
//     background: #FFF;
//     border: 1px solid #E5E5E5;
//     border-radius: 4px;
//     color: #333;
//     font-size: 14px;
//     font-weight: 500;
//     line-height: 20px;
//     .classic{
//     // display: flex;
//     padding-bottom: 10px;
//     >dt{
//       width: 100px;
//       &:nth-child(2){
//         border-radius: 100px;
//         background: #13D1BE;
//         color: #FFF;
//         height: 22px;
//         line-height: 22px;
//         width: 100px;
//         box-sizing: border-box;
//         margin-right: 40px;
//         text-align: center;
//       }
//     }
//     &:nth-child(1){
//       dd{
//         border-bottom: 1px solid #ddd;
//       }
//     }
//   }
//   }
</style>

