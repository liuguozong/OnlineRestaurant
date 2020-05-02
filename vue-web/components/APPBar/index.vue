<template>
  <div>
    <div class="APPBar">
      <!-- <div class="aa">
        <img src="/imgs/1.png" alt="锅底" />
        <p class="txt" @click="a">锅底</p>
      </div> -->
      <div class="APPBar">
        <div v-for="menus in menu" :key="menus.url" class="aa">
          <img :src="menus.src" :alt="menus.name" />
          <nuxt-link :to="{ name: 'menu-minute', params: { id: menus.name } }" class="txt">
            {{ menus.name }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  components: {},
  props: [],
  data() {
    return {
      menu: [
        { ulr: 'menu/minute', name: '锅底', src: '/imgs/1.png' },
        { ulr: 'minute', name: '涮菜', src: '/imgs/1.png' },
        { ulr: 'minute', name: '特色蘸料', src: '/imgs/1.png' },
        { ulr: 'minute', name: '小吃饮品', src: '/imgs/1.png' },
        { ulr: 'minute', name: '特色饮品', src: '/imgs/1.png' }
      ],
      index: false
    }
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  created() {},

  methods: {
    a() {
      console.log(this.index)
    }
  }
}
</script>
<style lang="scss" scoped>
.APPBar {
  font-family: 'Microsoft Yahei';
  .aa {
    background: #fff;
    box-shadow: 0 3px 5px #ccc;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    img {
      width: 35px;
      height: 35px;
      pointer-events: none;
      max-width: 100%;
      max-height: 100%;
      text-align: center;
      display: block;
      margin: 3px auto;
    }
    .txt {
      color: #333;
      display: block;
      font-size: 10px;
      line-height: 2;
      text-align: center;
      cursor: pointer;
      text-decoration: none;
    }
    .index {
      color: #e60012;
    }
  }
  .aa:hover {
    border: 1px solid #e60012;
    .txt {
      color: #e60012;
    }
  }
}
</style>
