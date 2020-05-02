<template>
  <div class="commtent-container">
    <v-card
      v-for="item in commentList"
      :key="item._id"
      color="#26c6da"
      dark
      max-width="500"
      class="mb-2"
    >
      <v-row>
        <v-col cols="12" sm="6" offset-sm="3">
          <v-container fluid>
            <v-row>
              <v-col v-for="n in item.icon" :key="n.uid" class="d-flex child-flex" cols="4">
                <v-card flat tile class="d-flex">
                  <v-img :src="n.url" class="grey lighten-2">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-col>
              <v-card-text class="headline font-weight-bold">
                {{ item.evaluate }}
              </v-card-text>
            </v-row>
            <v-card-actions>
              <v-list-item v-for="i in item.user" :key="i._id" class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img class="elevation-6" :src="i.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ i.name }}</v-list-item-title>
                </v-list-item-content>
                <v-row align="center" justify="end"></v-row>
              </v-list-item>
            </v-card-actions>
          </v-container>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { filterTZTime } from '~/utils/common.ts'

export default {
  name: '',

  components: {},

  filters: {
    // OK 不知道为啥，用 filters 时 输出留言的话会一直触发，所以决定再拿回数据的时候处理
    timeFiler(val) {
      console.log(val)
      const time = filterTZTime(val)
      return time
    }
  },
  props: {},
  data() {
    return {
      commentList: [],
      inputText: '',
      snackbar: false,
      text: '',
      timeout: 2000,
      curPage: 1, // DES 只有当用户点击了 next 之后才会有 passPage
      pageSize: 0, // DES 所有文章的总数，一页只显示10篇
      restPage: 0 // DES 剩余页数
    }
  },
  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  created() {
    this.orders()
  },

  methods: {
    async orders() {
      const res = await this.$axios.$get('/orders')
      console.log('1', res)
      this.commentList = res
    }
  }
}
</script>
<
<style lang="scss" scoped>
.commtent-container {
  min-height: 1200px;
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 100px;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 600px) {
    min-height: 600px;
  }
}
</style>
