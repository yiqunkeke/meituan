<template>
   <div class="m-menu">
       <dl class="nav" @mouseleave="mouseleave">
           <dt>全部分类</dt>
           <dd v-for="(item, idx) in $store.state.home.menu" :key="idx" @mouseenter="mouseenter(item.type)">
                <i :class="item.type"/>{{item.name}}<span class="arrow"/>
           </dd>
       </dl>
       <div class="detail" 
            v-if="kind"
            @mouseenter="sover"
            @mouseleave="sout"
            >
           <template  v-for="(item, idx) in curdetail">
            <h4 :key="idx">{{ item.title }}</h4>
            <span
            v-for="v in item.child"
            :key="v">{{ v }}</span>
        </template>
       </div>
   </div>
</template>

<script>
export default {
   name: '',
   data() {
       return {
           kind: "",
        //    menu: [
        //        {
        //            type: 'food',
        //            name: '美食',
        //            child: [
        //                {
        //                    title: '美食',
        //                    child: ['代金券', '甜点', '饮品', '火锅', '自助餐', '小吃快餐']
        //                }
        //            ]
        //        },
        //        {
        //            type: 'takeout',
        //            name: '外卖',
        //            child: [
        //                {
        //                    title: '外卖',
        //                    child: ['美团外卖']
        //                }
        //            ]
        //        },
        //        {
        //            type: 'hotel',
        //            name: '酒店',
        //            child: [
        //                {
        //                    title: '酒店星级',
        //                    child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
        //                }
        //            ]
        //        }
        //    ]
       }
   },
   computed: {
       curdetail() {
           return this.$store.state.home.menu.filter(item => {return item.type === this.kind})[0].child
       }
   },
   methods: {
       mouseleave() {
           let self = this;
           // 让弹层 延迟150ms 再消失
           self._timer = setTimeout(function() {
               self.kind = ""
           }, 150)
       },
       mouseenter(type){
           this.kind = type
       },
       sover() {
           // 如果鼠标在弹层上，清空定时器---即不消失
           clearTimeout(this._timer)
       },
       sout() {
           // 鼠标不在弹层，则 消失
           this.kind = ""
       }
   }
}
</script>

<style>
</style>
