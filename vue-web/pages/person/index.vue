<template>
  <div class="person-container">
    <v-card max-width="344" class="mx-auto">
      <v-window v-model="step">
        <!-- show start -->
        <v-window-item :value="1">
          <v-list-item>
            <v-list-item-avatar color="grey">
              <v-img :src="userInfo.avatar || '/imgs/n.jpg'" alt="CAD" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">{{ userInfo.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ userInfo.email || '还未绑定邮箱' }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-col class="text-center" cols="12" sm="4">
            <div class="my-2">
              <v-btn depressed color="#43A047">在线订餐</v-btn>
            </div>
            <div class="my-2">
              <v-btn depressed color="#9CCC65">订单评论</v-btn>
            </div>
            <div class="my-2">
              <v-btn depressed color="#546E7A">历史订单</v-btn>
            </div>
          </v-col>
          <!-- 下单页面 -->
          <v-card class="mx-auto" max-width="400" style="display:none">
            <v-toolbar flat color="deep-purple accent-4" dark>
              <v-btn icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>我的订单</v-toolbar-title>
            </v-toolbar>
            <v-tabs vertical>
              <v-tab>
                座位
              </v-tab>
              <v-tab>
                锅底
              </v-tab>
              <v-tab>
                涮菜
              </v-tab>
              <v-tab>
                小吃甜品
              </v-tab>
              <v-tab>
                特色饮品
              </v-tab>
              <v-tab>
                订单详情
              </v-tab>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-card-text>
                      <v-chip-group column mandatory>
                        <v-chip
                          v-for="Seats in seats.list"
                          :key="Seats._id"
                          :value="Seats._id"
                          filter
                          outlined
                        >
                          {{ Seats.name + '--' + '可容纳人数' + Seats.max }}
                        </v-chip>
                      </v-chip-group>
                    </v-card-text>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-card-text>
                      <v-chip-group v-model="amenities" column mandatory>
                        <v-chip
                          v-for="menu1s in menu1.list"
                          :key="menu1s._id"
                          :value="menu1s._id"
                          filter
                          outlined
                        >
                          {{ menu1s.name }}
                        </v-chip>
                      </v-chip-group>
                    </v-card-text>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-card-text>
                      <v-chip-group column multiple>
                        <v-chip v-for="menu2s in menu2.list" :key="menu2s._id" filter outlined>
                          {{ menu2s.name }}
                        </v-chip>
                      </v-chip-group>
                    </v-card-text>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-card-text>
                      <v-chip-group column multiple>
                        <v-chip v-for="menu3s in menu3.list" :key="menu3s._id" filter outlined>
                          {{ menu3s.name }}
                        </v-chip>
                      </v-chip-group>
                    </v-card-text>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-card-text>
                      <v-chip-group column multiple>
                        <v-chip v-for="menu4s in menu4.list" :key="menu4s._id" filter outlined>
                          {{ menu4s.name }}
                        </v-chip>
                      </v-chip-group>
                    </v-card-text>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
            <v-card-actions>
              <v-btn block class="white--text" color="deep-purple accent-4">
                下单
              </v-btn>
            </v-card-actions>
          </v-card>
          <!-- 历史页面 -->
          <v-card class="mx-auto" max-width="400" min-width="300" style="display:none">
            <v-toolbar flat color="deep-purple accent-4" dark>
              <v-btn icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>历史订单</v-toolbar-title>
            </v-toolbar>
            <v-simple-table fixed-header height="300px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">名字</th>
                    <th class="text-left">数量</th>
                    <th class="text-left">单价</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in detailed1" :key="item._id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.number }}</td>
                    <td>{{ item.price }}</td>
                  </tr>
                  <tr>
                    <td>总价</td>
                    <td></td>
                    <td>{{ detailed.total }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
          <!-- 评论页面 -->
          <v-card class="mx-auto" max-width="400" min-width="400" style="display:none">
            <v-toolbar flat color="deep-purple accent-4" dark>
              <v-btn icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>订单评论</v-toolbar-title>
            </v-toolbar>
            <v-file-input
              v-model="img"
              accept="image/*"
              label="上传评论照片"
              prepend-icon="mdi-plus"
              append-icon="mdi-upload"
              @click:append="upload"
            ></v-file-input>
            <v-card-actions>
              味道评分：
              <v-rating
                v-model="rating"
                :length="length"
                :empty-icon="emptyIcon"
                :full-icon="fullIcon"
                :half-icon="halfIcon"
                :half-increments="halfIncrements"
                :hover="hover"
                :readonly="readonly"
                :size="size"
                :dense="dense"
                :color="color"
                :background-color="bgColor"
                class="d"
              ></v-rating>
            </v-card-actions>
            <v-card-actions>
              服务评分：
              <v-rating
                v-model="rating"
                :length="length"
                :empty-icon="emptyIcon"
                :full-icon="fullIcon"
                :half-icon="halfIcon"
                :half-increments="halfIncrements"
                :hover="hover"
                :readonly="readonly"
                :size="size"
                :dense="dense"
                :color="color"
                :background-color="bgColor"
                class="d"
              ></v-rating>
            </v-card-actions>
            <v-card-actions>
              环境评分：
              <v-rating
                v-model="rating"
                :length="length"
                :empty-icon="emptyIcon"
                :full-icon="fullIcon"
                :half-icon="halfIcon"
                :half-increments="halfIncrements"
                :hover="hover"
                :readonly="readonly"
                :size="size"
                :dense="dense"
                :color="color"
                :background-color="bgColor"
                class="d"
              ></v-rating>
            </v-card-actions>
            <v-textarea
              v-model="inputText"
              filled
              label="请输入评论"
              counter
              :rules="rules1"
            ></v-textarea>
            <v-card-actions>
              <v-btn block class="white--text" color="deep-purple accent-4">
                上传评论
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>
        <!-- show end -->

        <!-- edit start -->
        <v-window-item :value="2">
          <v-card-text>
            <v-img
              :src="changeUserInfo.avatar || 'https://cdn.vuetifyjs.com/images/cards/mountain.jpg'"
              height="194"
            ></v-img>
            <v-file-input
              v-model="img"
              accept="image/*"
              label="上传头像"
              prepend-icon="mdi-plus"
              append-icon="mdi-upload"
              @click:append="upload"
            ></v-file-input>
            <v-text-field v-model="changeUserInfo.name" maxlength="10" label="Name"></v-text-field>
            <v-text-field v-model="changeUserInfo.email" label="Email"></v-text-field>
          </v-card-text>
        </v-window-item>
        <!-- edit end -->
      </v-window>

      <v-card-actions>
        <v-btn v-show="step === 2" text color="#004A97" @click="step--">
          后退
        </v-btn>
        <v-btn v-show="step === 1" text color="red" @click="logout">
          注销
        </v-btn>
        <v-btn text color="#00ADBB" @click="submit">
          {{ step === 1 ? '编辑' : '保存' }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="#00ADBB">
      {{ text }}
      <v-btn color="white" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <Transition style="margin-top:100px" />
  </div>
</template>

<script>
import Transition from '@/components/Transition'
export default {
  name: '',

  components: { Transition },
  props: {},
  data() {
    return {
      inputText: '',
      rules1: [(v) => v.length <= 200 || '不能超过200字'],
      emptyIcon: 'mdi-heart-outline',
      fullIcon: 'mdi-heart',
      halfIcon: 'mdi-heart-half-full',
      halfIncrements: false,
      hover: true,
      length: 5,
      rating: 2,
      readonly: false,
      size: 30,
      dense: false,
      color: 'red lighten-3',
      colors: ['primary', 'warning', 'green', 'red', 'blue', 'error', 'teal', 'red lighten-3'],
      bgColor: 'grey lighten-1',
      bgColors: [
        'grey lighten-2',
        'warning lighten-1',
        'green lighten-2',
        'red lighten-2',
        'grey',
        '#eee',
        'cyan lighten-2',
        'grey lighten-1'
      ],
      amenities: [],
      seats: [],
      detailed: [],
      detailed1: [],
      menu1: [],
      menu2: [],
      menu3: [],
      menu4: [],
      img: null,
      text: '',
      snackbar: false,
      timeout: 2000,
      triggerOn: { activity: false, des: false, avatar: false },
      userInfo: {},
      redHeart: false,
      change: false,
      step: 1,
      email: '',
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      },
      changeUserInfo: {}
    }
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  created() {
    this.getPersonDetail()
    this.minute()
    this.seats1()
    this.detaileds()
  },

  methods: {
    repeatCheck(list) {
      const pureList = []
      if (!list.activitys) {
        return true
      }
      list.activitys.forEach((i) => {
        if (!pureList.includes(i.name)) {
          pureList.push(i.name)
        }
      })
      list.activitys = pureList
      return list
    },
    async logout() {
      const res = await this.$store.dispatch('user/logout')
      if (res) {
        this.$router.push('/')
      }
      console.log('logout res:', res)
    },
    uploadCheck() {
      // 检测大小 类型已有原生节点控制
      if (!this.img) {
        this.$store.dispatch('error/changeShow', { status: true, message: '请先添加图片!' })
        return false
      }

      const file = this.img
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        console.log('上传头像图片大小不能超过 2MB!')
        this.$store.dispatch('error/changeShow', { status: true, message: '大小不得超过2MB!' })
        return false
      }

      return true
    },

    async upload() {
      const check = this.uploadCheck()
      if (!check) {
        return false
      }
      const formData = new FormData()
      formData.append('file', this.img, this.img.name)
      const res = await this.$axios.$post('/upload', formData)
      this.text = '上传成功'
      this.snackbar = true
      console.log('upload img res:', res)
      this.changeUserInfo.avatar = res
    },
    async submit() {
      try {
        if (this.step === 2) {
          // 提交更改，退出函数
          const res = await this.$axios.$put('/user/edit', this.changeUserInfo)
          this.text = res.message
          this.snackbar = true
          this.getPersonDetail()
          this.step--
          console.log('change person information res:', res)
          return true
        }
        // 刚刚切换到修改界面
        // 防止用户提交空值， 在这里直接拿到 show 的数据
        this.changeUserInfo = Object.assign({}, this.userInfo)
        this.step++
      } catch (e) {
        const message = e.response.data.message || e.response.data.error
        this.$store.dispatch('error/changeShow', { status: true, message })
      }
    },
    getPersonDetail() {
      this.$store
        .dispatch('user/getUserInfo')
        .then((res) => {
          console.log('userInfo res:', res)
          // DES 因为在 created 阶段调用了此方法，代码如果过于臃肿会导致速度很慢
          this.userInfo = res
          console.log('userInfo ', this.repeatCheck(res))
          console.log('res ', this.userInfo)
        })
        .catch((e) => {
          const message = e.response.data.message || e.response.data.error
          this.$store.dispatch('error/changeShow', { status: true, message })
        })
    },
    async minute() {
      console.log(this.query)
      this.menu1 = await this.$axios.$get('/menus', {
        params: {
          key: '锅底'
        }
      })
      console.log(this.menu1)
      this.menu2 = await this.$axios.$get('/menus', {
        params: {
          key: '涮菜'
        }
      })
      this.menu3 = await this.$axios.$get('/menus', {
        params: {
          key: '小吃甜品'
        }
      })
      this.menu4 = await this.$axios.$get('/menus', {
        params: {
          key: '特色饮品'
        }
      })
    },
    async seats1() {
      this.seats = await this.$axios.$get('/seats', {
        params: {
          key: '空闲'
        }
      })
      console.log('zw', this.seats)
    },
    async detaileds() {
      this.detailed = await this.$axios.$get('/detaileds')
      this.detailed1 = this.detailed[0].menu
      this.detailed = this.detailed[0]
      console.log('dd', this.detailed)
    }
  }
}
</script>
<style lang="scss" scoped>
.person-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 150px;

  // align-items: center;
  // @media screen and(max-width: 1920px) {
  //   height: 1200px;
  // }
  // @media screen and(max-width: 1264px) {
  //   height: 800px;
  // }
  // @media screen and(max-width: 960px) {
  //   height: 600px;
  // }
}
</style>
