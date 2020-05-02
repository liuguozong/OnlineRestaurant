<template>
  <div>
    <p class="biao"></p>
    <div class="box">
      <v-responsive class="overflow-y-auto" max-height="600">
        <v-lazy
          :options="{
            threshold: 0.5
          }"
          min-height="200"
          transition="fade-transition"
        >
          <v-card class="mx-auto" style="width:1000px">
            <v-container justify="center">
              <v-row>
                <v-col v-for="itme in info.list" :key="itme.name" cols="6" md="4">
                  <v-card outlined tile style=" height: 400px; width: 291px;">
                    <div class="a">
                      <img :src="itme.icon" :alt="itme.name" />
                      <p class="txt">{{ itme.name }}</p>
                      <div class="b">
                        <p class="c">{{ itme.name }}</p>
                        <p class="summary">
                          {{ itme.depict }}
                        </p>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-lazy>
      </v-responsive>
    </div>
    <APPBar class="APP" />
  </div>
</template>

<script>
import APPBar from '~/components/APPBar'
export default {
  name: '',
  components: { APPBar },

  // },
  data() {
    return {
      info: []
    }
  },
  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  created() {
    this.minute()
  },

  methods: {
    async minute() {
      console.log(this.query)
      const res = await this.$axios.$get('/menus', {
        params: {
          key: this.$route.params.id
        }
      })
      console.log(res)
      this.info = res
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  position: relative;
  width: 1200px;
  min-height: 1000px;
  height: 100%;
  top: 100px;
  margin: 3px auto;
  .a {
    height: 400px;
    width: 291px;
    float: left;
    position: relative;
    overflow: hidden;
    top: 0px;
    img {
      border: none;
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }
    .txt {
      font-size: 28px;
      color: #fff;
      line-height: 45px;
      float: left;
      position: absolute;
      top: 1em;
      left: 1em;
      z-index: 80;
      background: url(/imgs/bj.png) no-repeat 0 center;
      padding-left: 20px;
    }
    .b {
      display: none;
      top: 400px;
      height: 400px;
      width: 100%;
      position: absolute;
      background: red;
      border-radius: 40px 40px;
      .c {
        font-size: 28px;
        color: #fff;
        line-height: 48px;
        text-align: center;
      }
      .summary {
        font-size: 16px;
        line-height: 32px;
        color: #fff;
        text-align: justify;
        list-style: none;
      }
    }
  }
}
.APP {
  position: fixed;
  top: 50%;
}
// .a:hover {
//   top: -350px;
//   .b {
//     top: 300px;
//   }
// }
</style>
