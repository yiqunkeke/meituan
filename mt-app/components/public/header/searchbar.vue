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
                        <dd v-for="(item, idx) in hotPlace" :key="idx">
                            {{item}}
                        </dd>
                    </dl>
                    <dl class="searchList" v-if="isSearchList">
                        <dd v-for="(item, idx) in searchList" :key="idx">
                            {{item}}
                        </dd>
                    </dl>
                </div>
                <p class="suggest">
                    <a href="">故宫博物院</a>
                    <a href="">故宫博物院</a>
                    <a href="">故宫博物院</a>
                    <a href="">故宫博物院</a>
                    <a href="">故宫博物院</a>
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
export default {
   name: '',
   data() {
       return {
           isFocus: false, // 鼠标聚焦状态
           search: "", // 搜索框的值
           hotPlace: ['火锅', '火锅', '火锅'],
           searchList: ['故宫', '故宫', '故宫']
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
    input(){
        console.log("input事件");
    }
   }
}
</script>

<style>
</style>
