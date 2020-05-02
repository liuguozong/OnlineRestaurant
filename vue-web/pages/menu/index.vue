<template>
  <div>
    <div class="carousel">
      <v-carousel v-model="model" :show-arrows="false" hide-delimiters height="850px">
        <v-carousel-item
          v-for="(item, index) in items"
          :key="index"
          :src="item.src"
          transition="fade-transition"
        >
          <v-row class="describe">
            <p>
              <span>招牌锅底</span>
              -{{ item.title }}
            </p>
            <p>{{ item.describe }}</p>
            <p>{{ item.content }}</p>
            <p><b>锅底分类</b></p>
            <p>{{ item.classify }}</p>
          </v-row>
          <v-row class="bottom">
            <p @click="model--"></p>
            {{ model + 1 }}/
            <p>{{ items.length }}</p>
            <p @click="model++"></p>
            <span>查看更多→</span>
          </v-row>
        </v-carousel-item>
      </v-carousel>
      <APPBar class="APP" />
    </div>
  </div>
</template>

<script>
import APPBar from '~/components/APPBar'

export default {
  name: '',
  components: {
    APPBar
  },
  data() {
    return {
      items: [
        {
          title: '番茄锅底',
          describe: '一定要喝汤的番茄火锅',
          content: '精选日照充裕的阳光番茄，制酱炒制而成的番茄底料；推荐搭配河鲜类食材。',
          classify: '白味锅',
          src: '/imgs/fanqie.jpg'
        },
        {
          title: '牛油麻辣火锅',
          describe: '慢火熬煮4小时的牛油锅底',
          content: '选用牛油与茂汶等原产花椒；越煮越香，不变味；搭配蒜泥香油味碟，这样吃才地道！',
          classify: '红味锅',
          src: '/imgs/niuyou.jpg'
        },
        {
          title: '菌汤火锅',
          describe: '菌菇慢火熬煮2小时',
          content: '锅底汤色黄褐，清澈；菌香浓郁、爽口；推荐搭配涮食菌菇类食材。',
          classify: '白味锅',
          src: '/imgs/mogu.jpg'
        },
        {
          title: '清油麻辣火锅',
          describe: '植物油炒制,香辣浓郁不油腻',
          content:
            '严选花椒、辣椒、香辛料原料，地道川味火锅；传统工艺发酵豆瓣；汤底色泽鲜红，口感香辣浓郁；推荐搭配涮食脆弹类动物食材。',
          classify: '红味锅',
          src: '/imgs/mala.jpg'
        },
        {
          title: '三鲜火锅',
          describe: '色泽纯正，口感鲜香浓郁',
          content:
            '选用现代工艺萃取的结合肉类浓缩骨汤为汤底；可根据喜好搭配不同的特色味碟均可，配合芝麻酱更佳；推荐搭配涮食海鲜类及素食类食材。',
          classify: '白味锅',
          src: '/imgs/haixian.jpg'
        }
      ],
      colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
      model: 0
    }
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.carousel {
  .describe {
    position: absolute;
    left: 60%;
    top: 30%;
    p:nth-child(1) {
      font-size: 40px;
      width: 600px;
      span {
        color: red;
      }
    }
    p:nth-child(2) {
      display: inline-block;
      padding: 5px 10px;
      background: #e60012;
      border-radius: 3px;
      color: #fff;
      font-size: 22px;
    }
    p:nth-child(3) {
      font-size: 20px;
      line-height: 32px;
      color: #666;
    }
    p:nth-child(4) {
      font-size: 20px;
      width: 800px;
    }
    p:nth-child(5) {
      font-size: 20px;
      line-height: 32px;
    }
  }
  .bottom {
    position: absolute;
    left: 60%;
    top: 75%;
    color: red;
    font-size: 20px;
    span {
      width: 172px;
      height: 34px;
      background: transparent;
      border-radius: 46px;
      font-size: 18px;
      color: #888;
      line-height: 34px;
      text-align: center;
      color: #fff;
      background: #e60012;
      margin-left: 20px;
    }
    p:nth-child(1) {
      width: 30px;
      height: 30px;
      cursor: pointer;
      background-image: url(/imgs/zuo.png);
    }
    p:nth-child(2) {
      color: #333333;
    }
    p:nth-child(3) {
      width: 30px;
      height: 30px;
      cursor: pointer;
      background-image: url(/imgs/you.png);
    }
  }
}
.APP {
  position: fixed;
  top: 50%;
}
</style>
