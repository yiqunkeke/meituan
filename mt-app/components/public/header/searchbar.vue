<template>
   <div class="search-panel">
       <el-row class="m-header-searchbar">
           <el-col :span="3" class="left">
               <img src="https://s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="">
           </el-col>
           <el-col :span="15" class="center">
                <div class="wrapper">
                    <el-input placeholder="搜索商家或地点" v-model="search" @focus="focus" @blur="blur" @input="input" />
                    <button class="el-button el-button--primary"><i class="el-icon-search"></i></button>
                    <dl class="hotPlace" v-if="isHotPlace">
                        <dt>热门搜索</dt>
                        <dd v-for="(item, idx) in $store.state.home.hotPlace.slice(0, 3)" :key="idx">
                            <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a>
                        </dd>
                    </dl>
                    <dl class="searchList" v-if="isSearchList">
                        <dd v-for="(item, idx) in searchList" :key="idx">
                            <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a>
                        </dd>
                    </dl>
                </div>
                <p class="suggest">
                    <a :href="'/products?keyword='+encodeURIComponent(item.name)" v-for="(item, idx) in $store.state.home.hotPlace.slice(0, 5)" :key="idx">{{item.name}}</a>
                </p>
                <ul class="nav">
                    <li>
                        <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
                        <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
                        <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
                        <nuxt-link to="/" class="apartment">民俗/公寓</nuxt-link>
                        <nuxt-link to="/" class="business">商家入驻</nuxt-link>
                    </li>
                </ul>
           </el-col>
           <el-col :span="6" class="right">
               <ul class="security">
                   <li><i class="refund"><p class="txt">随时退</p></i></li>
                   <li><i class="single"><p class="txt">不满意免单</p></i></li>
                   <li><i class="overdue"><p class="txt">过期退</p></i></li>
               </ul>
           </el-col>
       </el-row>

   </div>
</template>

<script>
import _ from 'lodash';
export default {
   name: '',
   data() {
       return {
           isFocus: false, // 鼠标聚焦状态
           search: "", // 搜索框的值
           hotPlace:[],
           // hotPlace: ['火锅', '火锅', '火锅'],
            searchList: []
           // searchList: ['故宫', '故宫', '故宫']
           
       }
   },
   computed: {
       isHotPlace() {
           return this.isFocus && !this.search
       },
       isSearchList (){
           return this.isFocus && this.search
       }
   },
   methods: {
    focus(){
        this.isFocus = true
    },
    blur(){
        let self = this
        setTimeout(function() {
          self.isFocus = false  
        }, 200)
    },
    // 如果每次输入都发送一个请求，显然不合理。（网络请求过于频繁）
    // 所以我们借助一个库叫 lodash，需要 npm i lodash 进行安装 
    // 把 input() 函数---改成一个 _.debounce() 延迟函数
    input: _.debounce(async function () {
        let self = this;
        let city = "三亚"
        self.searchList = []
        let {status, data: {top}} = await self.$axios.get('/search/top', {
            params: {
                input: self.search,
                city
            }
        })
        self.searchList = top.slice(0, 10)
    }, 300)
   }
}
</script>

<style>
</style>
