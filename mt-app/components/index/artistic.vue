<template>
   <section class="m-istyle">
       <dl>
           <dt>有格调</dt>
           <dd v-for="(item, idx) in list" :key="idx" @mouseenter="mouseenter(item.type)">{{item.name}}</dd>
       </dl>
       <ul class="ibody">
           <li v-for="(item, idx) in curdetail" :key="idx">
               <el-card :body-style="{ padding: '0px' }" shadow="never">
                    <img :src="item.imgSrc">
                    <ul class="cbody">
                        <li class="title">{{item.title}}</li>
                        <li class="pos"><span>{{item.pos}}</span></li>
                        <li class="price">￥<em>{{item.price}}</em><span>/起</span></li>
                    </ul>
               </el-card>
           </li>
       </ul>
   </section>
</template>

<script>
export default {
  data() {
    return {
      kind: "all",
      list: [
        {
          type: "all",
          name: "全部",
          detail: [
            {
              title: "南京精菜馆",
              pos: "北京南京大饭店分店",
              price: 1288,
              imgSrc:
                "https://p0.meituan.net/msmerchant/f682553974f941fb5f616991dc65876b1319400.jpg@368w_208h_1e_1c"
            },
            {
              title: "小王府徽菜臭鳜鱼",
              pos: "小王府精品烤鸭（含鸭饼小料）1份",
              price: 118,
              imgSrc:
                "https://p1.meituan.net/msmerchant/17d8cd5405ccc74eb440af6fe7c8892f853757.png@368w_208h_1e_1c"
            },
            {
              title: "俏江南（东方广场店）",
              pos: "双丝套餐，建议2人使用",
              price: 128,
              imgSrc:
                "https://p0.meituan.net/scarlett/3d7277585e3718c032f31b3d028618d490198.png@368w_208h_1e_1c"
            },
          ]
        },
        {
          type: "part",
          name: "约会聚餐",
          detail: [
            {
              title: "北京饭店阳光咖啡厅",
              pos: "特价自助晚餐",
              price: 238,
              imgSrc:
                "https://p0.meituan.net/msmerchant/1a8aaac8cfcf76fae83c2ecd6405bd4c1457315.jpg@368w_208h_1e_1c"
            },
            {
              title: "北京饭店诺金东33餐厅",
              pos: "桌餐C，建议8-10人使用，可免费使用包间",
              price: 5000,
              imgSrc:
                "https://p1.meituan.net/poi/697cf6a6e1785559a7bb31d0bf03c649110592.jpg@368w_208h_1e_1c"
            }
          ]
        },
        {
          type: "spa",
          name: "丽人SPA",
          detail: [
            {
              title: "小P老师·P.STYLE 派斯造型（短发大师店）",
              pos: "小P老师·P.STYLE 派斯造型（短发大师店）",
              price: 351,
              imgSrc:
                "https://p1.meituan.net/wedding/78281633810d3f58bfb179cfc31a4e21415922.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c"
            },
            {
              title: "新屿悦和食汇",
              pos: "自助单人餐",
              price: 188,
              imgSrc:
                "https://p0.meituan.net/msmerchant/775fa45a4ec9dbe6bc6f353ec489756e104350.jpg@368w_208h_1e_1c"
            }
          ]
        },
        {
          type: "movie",
          name: "电影演出",
          detail: [
            {
              title: "金泉港IMAX国际影城",
              pos: "免押金,可停车,有情侣座,儿童票,有WIFI,IMAX厅,杜比全景声厅",
              price: 40.9,
              imgSrc:
                "https://p0.meituan.net/poi/c2b482474377fc31a8311f46055f40b0442616.png@368w_208h_1e_1c"
            },
            {
              title: "kinglove金乐喜来登",
              pos: "8英寸欧式水果生日蛋糕",
              price: 78.8,
              imgSrc:
                "https://p0.meituan.net/msmerchant/7fed2224f3b8ac93de4f5cd29d0331fe113913.jpg@368w_208h_1e_1c"
            }
          ]
        },
        {
          type: "travel",
          name: "品质出游",
          detail: [
            {
              title: "好特热温泉酒店",
              pos: "酒店套餐",
              price: 40.9,
              imgSrc:
                "https://p1.meituan.net/dnaimgdark/ace2207e5e2cc55846e83134f6cacc7b5138030.jpg@368w_208h_1e_1c"
            }
          ]
        }
      ]
    };
  },
  computed: {
    curdetail() {
      return this.list.filter(item => {
        return item.type === this.kind;
      })[0].detail;
    }
  },
  methods: {
    mouseenter(type) {
        let self = this;
        setTimeout(function () {
            self.kind = type;
        }, 150)
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>
