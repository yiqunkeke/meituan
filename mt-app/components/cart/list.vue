<template>
   <el-table
    :data="cartData"
    style="width: 980px">
        <el-table-column
            label="项目"
            width="430">
            <template slot-scope="scope">
                <img :src="scope.row.imgs" alt="" width="50" height="50" align="center" style="margin-right:10px;">
                {{scope.row.name}}
            </template>
        </el-table-column>
        <el-table-column
            prop="price"
            label="单价"
            width="132" />
            <!-- prop属性：是单向绑定的，只做显示 -->
        <el-table-column
            label="数量"
            width="200" >
            <!-- slot-scope属性：是双向绑定的，视图改变，数据也发生变化 -->
            <template slot-scope="scope">
                <el-input-number v-model="scope.row.count" :min="0" />
            </template>
        </el-table-column>  
        <el-table-column
            label="总价">
            <template slot-scope="scope">
                {{scope.row.price * scope.row.count}}
            </template>
        </el-table-column>          
  </el-table>
</template>

<script>
export default {
   props: {
       cartData: {
           type: Array,
           default: ()=>{
               return []
           }
       }
   }
}
</script>
