<template>
   <div class="m-iselect">
       <span class="name">
           按省份选择：
       </span>

       <el-select v-model="pvalue" placeholder="省份">
            <el-option
            v-for="item in province"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>

        <el-select v-model="cvalue" placeholder="城市" :disabled="!city.length">
            <el-option
            v-for="item in city"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>

        <span class="name">
           直接搜索：
        </span>
        <el-autocomplete
            v-model="input"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入城市中文或拼音"
            @select="handleSelect"
            ></el-autocomplete>
   </div>
</template>

<script>
import _ from 'lodash';
export default {
   name: '',
   data() {
       return {
           province: [], // 省份列表
           pvalue: '', // 选中的省份
           city: [], // 选中省份的城市列表
           cvalue: '', // 选中的城市
           input:'', // 输入的值 
           cities: [] // 全国的城市列表
       }
   },
   watch:{
       async pvalue(newPvalue){
           let self = this;
           // 获取--某个省份/:id
           let {status, data: {city}}= await self.$axios.get(`/geo/province/${newPvalue}`)
           if(status===200) {
               // 把接口返回的数据，与自己的数据---做map映射
               self.city = city.map(item => {
                   return {
                       value: item.id,
                       label: item.name
                   }
               })
               self.cvalue = '' // 重置城市选中值
           }
       }
   },
   async mounted(){
       // 获取--所有省份
       let self = this;
       let {status, data: {province}} = await self.$axios.get('/geo/province')
       if(status === 200){
           // 把接口返回的数据，与自己的数据---做map映射
           self.province = province.map(item => {
               return {
                    value: item.id,
                    label: item.name
               }
           })
       }

   },
   methods: {
       // 1.当用户输入内容时，该事件被响应
       querySearchAsync:_.debounce(async function(query, cb) {
           // query 参数为：用户输入的内容
           // cb为回调函数
           let self = this;

           if(self.cities.length) {
               // 如果全国城市列表中有值，则直接返回与输入的内容匹配的项
               cb(self.cities.filter(item => item.value.indexOf(query) > -1))
           } else {
                // 如果全国城市列表中没有值，则先去请求数据
                let {status, data: {city}} = await self.$axios.get('/geo/city')
                if(status===200) {
                    self.cities = city.map(item =>{ // !!!重点：从后端获取数据后，与前端数据结构做map映射。
                        return {
                            value: item.name // 3.数据必须有 value 属性!!!!
                        }
                    })
                    // 再返回与输入的内容匹配的项
                    cb(self.cities.filter(item => item.value.indexOf(query) > -1))
                } else {
                    // 请求失败时,返回空数组
                    cb([])
                }
           }
       }, 200),

       // 2.当选中时 
       handleSelect(item){
           console.log(item.value)
       }
   }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>
