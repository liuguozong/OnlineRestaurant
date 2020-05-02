<template>
  <div>
    <el-table
      :data="orders"
      style="width: 100%"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          <span
            v-for="item in scope.row.user" 
            :key="item._id" 
            :value="item.name" 
            :prop="item.name"
          >
            {{ item.name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="当前状态"></el-table-column>
      <el-table-column prop="mode" label="支付方式"></el-table-column>
      <el-table-column prop="total" label="应付金额"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="query.key" 
            icon="el-icon-search"
            size="mini"
            placeholder="输入关键字搜索" 
            clearable
            @blur="searchMethod"
            @clear="searchMethod"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row), (dialogVisible = true)">
            Edit
          </el-button>
          <el-dialog
            title="订单详情"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            center
          >
            <template>
              <el-tabs v-model="activeName">
                <el-tab-pane label="基本信息" name="first">
                  <el-form v-model="o">
                    <el-form-item label="用户" :label-width="formLabelWidth">
                      <el-input 
                        v-model="o" 
                        :disabled="true"
                        style="width:100px"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="座位" :label-width="formLabelWidth">
                      <el-input 
                        v-model="seatedName" 
                        :disabled="true"
                        style="width:100px"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="应付金额" :label-width="formLabelWidth">
                      <el-input 
                        v-model="ordersdata.total" 
                        :disabled="true"
                        style="width:100px"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="当前状态" :label-width="formLabelWidth">
                      <el-select v-model="ordersdata.state" placeholder="请选择当前方式">
                        <el-option label="预定" value="预定"></el-option>
                        <el-option label="正在用餐" value="正在用餐"></el-option>
                        <el-option label="退款" value="退款"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="支付方式" :label-width="formLabelWidth">
                      <el-select v-model="ordersdata.mode" placeholder="请选择支付方式">
                        <el-option label="现金支付" value="现金支付"></el-option>
                        <el-option label="二维码支付" value="二维码支付"></el-option>
                        <el-option label="在线支付" value="在线支付"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="备注" :label-width="formLabelWidth">
                      <el-input
                        v-model="ordersdata.remarks"
                        type="textarea"
                        placeholder="请输入内容"
                        maxlength="30"
                        show-word-limit
                      >
                      </el-input>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="菜单信息" name="second">
                  <el-form>
                    <el-form-item label="添加菜品">
                      <el-select
                        v-model="newly"
                        filterable
                        multiple
                        collapse-tags
                        clearable
                        placeholder="请选择添加菜品"
                        @visible-change="input($event)"
                      >
                        <el-option
                          v-for="item of add"
                          :key="item._id"
                          :label="item.name"
                          :value="item._id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <template>
                    <el-table
                      :data="detailed"
                      style="width: 100%"
                      :summary-method="getSummaries"
                      show-summary
                    >
                      <el-table-column prop="name" label="名字" width="100"></el-table-column>
                      <el-table-column prop="price" label="单价" width="100"></el-table-column>
                      <el-table-column label="数量" width="180">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.number"
                            size="mini"
                            :min="1"
                            :max="10"
                          ></el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作">
                        <template slot-scope="scope">
                          <el-button
                            size="mini"
                            type="danger"
                            @click="detailedDelete(scope.$index, scope.row)"
                          >删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-tab-pane>
                <el-tab-pane label="座位信息" name="third">
                  <el-input
                    v-model="seatedName"

                    :disabled="true"
                  >
                  </el-input>
                  <!-- 可供选择的表 -->
                  <el-table
                    :data="seat"
                    style="width: 100%"
                  >
                    <el-table-column
                      prop="name"
                      label="座位名"
                      width="180"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="max"
                      label="可容纳人数"
                      width="180"
                    >
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="warning"
                          @click="exchange(scope.$index, scope.row)"
                        >交换</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="评论信息" name="fourth">
                  <el-form>
                    <el-form-item label="味道评分">
                      <el-rate
                        v-model="ordersdata.taste"
                        :max="5"
                        void-icon-class="el-icon-cherry"
                        :colors="colors"
                        show-text
                        style="margin-top:0.6rem"
                      >
                      </el-rate>
                    </el-form-item>
                    <el-form-item label="服务评分">
                      <el-rate
                        v-model="ordersdata.service"
                        :max="5"
                        void-icon-class="el-icon-cherry"
                        :colors="colors"
                        show-text
                        style="margin-top:0.6rem"
                      >
                      </el-rate>
                    </el-form-item>
                    <el-form-item label="环境评分">
                      <el-rate
                        v-model="ordersdata.surroundings"
                        :max="5"
                        void-icon-class="el-icon-cherry"
                        :colors="colors"
                        show-text
                        style="margin-top:0.6rem"
                      >
                      </el-rate>
                    </el-form-item>
                    <el-form-item label="评论">
                      <el-card :body-style="{ padding: '0px' }">
                        <el-upload
                          :file-list="fileList"
                          :action="BASEURL+'upload'"
                          list-type="picture-card"
                          :on-preview="handlePictureCardPreview"
                          :on-remove="handleRemove"
                          :on-success="handleSuccess"            
                          :on-exceed="exceed"
                          :limit="imgNumber"
                          :before-upload="beforeAvatarUpload"
                        >
                          <i class="el-icon-plus" />
                        </el-upload>
                        <el-dialog :visible.sync="zp" :modal-append-to-body="false">
                          <img width="100%" :src="dialogImageUrl" alt>
                        </el-dialog>
                        <div style="padding: 14px;">
                          <span>
                            <el-input
                              v-model="ordersdata.evaluate"
                              type="textarea"
                              placeholder="请输入内容"
                              maxlength="30"
                              show-word-limit
                            >
                            </el-input>
                          </span>
                        </div>
                      </el-card>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </template>
            <span slot="footer" class="dialog-footer">
              <el-button @click="handleClose">取 消</el-button>
              <el-button type="primary" @click="handleClose">确 定</el-button>
            </span>
          </el-dialog>

          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-pagination
            style="margin-bottom:15px"
            align="center"
            layout="prev, pager, next"
            :total="page.count"
            @current-change="changePage"
          />
        </el-col>
      </el-row>
    </el-footer>
  </div>
</template>
<script>
import { orderList, orderdata, orderedit, orderremove, detailedadd, detaileddit } from '@/api/order'
import { meunList } from '@/api/menu'
import { seatList, seatedit } from '@/api/seat'
import request from '@/utils/request'
export default {
  data() {
    return {
      BASEURL: request.defaults.baseURL, // 文件上传URL
      orders: [],
      user: [],
      users: [],
      menu: [],
      menus: [],
      seat: [],
      seats: [],
      seated: [],
      state: [],
      seatedName: '', 
      detailed: [],
      detaileds: [],
      add: [],
      zj: [],
      newly: [],
      query: {
        key: '',
        limit: 10,
        page: 1,
        sort: ''
      },
      page: {
        limit: 10,
        count: 0,
        page: 1
      },
      o: '',
      taste: null,
      ordersdata: {
        user: '',
        menus: '',
        seat: '',
        evaluate: '',
        icon: '',
        taste: 5,
        service: 5,
        surroundings: 5,
        state: '',
        price: '',
        Mode: '',
        remarks: ''
      },
      search: '',
      dialogVisible: false, // 是否打开用户详情
      activeName: 'first', // 控制Tabs 标签页
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      dialogImageUrl: '',
      zp: false, 
      alter: false, //  是否修改了座位
      imgNumber: 9,
      fileList: [],
      formLabelWidth: '70px'
    }
  },
  created() {
    this.oreder()
  },
  methods: {
    async oreder() {
      await orderList(this.query).then((response) => {
        this.orders = response.list
        this.page.count = response.count
      })
    },
    // 分页
    changePage(val) {
      this.query.page = val
      console.log('当前页：', val, 'query数据：', this.query)
      this.oreder(this.query)
    },
    // 搜索
    async searchMethod() {
      const query = Object.assign({}, this.query)
      const res = await orderList(query)
      if (res) {
        this.orders = res.list
        this.page.count = res.count
      } else {
        this.$message.info('请检查输入内容')
      }
    },
    // 编辑按钮
    async handleEdit(index, row, data,) {
      const res = await orderdata(`${row._id}`, data)
      this.ordersdata = Object.assign({}, this.ordersdata, res.data)
      this.fileList = this.ordersdata.icon 
      console.log(`1123`, this.fileList)
      // 得到座位详细信息 然后将座位名赋值
      this.seated = Object.assign({}, this.seat, res.detailed.seats)
      this.seatedName = this.seated[0]['name']
      this.menu = res.detailed['detailed'][0]
      this.detailed = res.detailed.detailed[0]['menu']
      // 得到所有的菜单和座位
      await meunList().then((data) => {
        this.menus = data.flat(Infinity)
      })
      this.query.key = '空闲'
      await seatList(this.query).then((data) => {
        this.seats = data.list
        this.query.key = ''
      })
      this.o = this.ordersdata.user[0]['name']
      this.Seat()
      this.alter = false
      this.replace()
    },
    // 删除按钮
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          orderremove(`${row._id}`).then((result) => {
            this.oreder()
            this.$message({
              type: 'success',
              message: result.message
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 保存
    async handleClose() {
      this.$confirm('是否保存？')
        .then((_) => {               
          orderedit(this.ordersdata._id, this.ordersdata).then((result) => {
            this.$message({
              type: 'success',
              message: result.message
            })
            this.menu['menu'] = this.detailed
            detaileddit(this.ordersdata.detailed[0], this.menu)
            if (this.alter) {
              // 修改旧替换座位信息
              seatedit(this.state[0]['_id'], this.state[0])
              console.log(`j`, this.state[0])
              console.log(`x`, this.seated)
              // 修改新替换座位信息
              seatedit(this.ordersdata.seats, this.seated)
            }   
           
            this.ordersdata = {}
            this.activeName = 'first'
          })
          this.query.key = ''
          this.oreder()
          this.dialogVisible = false
        })
        .catch((_) => {
          this.dialogVisible = false
          this.ordersdata = {}
          this.$message({
            message: '放弃保存并离开页面'
          })
          this.activeName = 'first'
        })
    },
    //  创建订单详细  订单表和详情表相关联
    async addc() {
      this.menu.forEach((item) => {
        this.detaileds.push({
          _id: item._id,
          name: item.name,
          icon: item.icon,
          number: item.number,
          price: item.price
        })
      })
      this.detailed['order'] = this.ordersdata._id
      this.detailed['menu'] = this.detaileds
      const res = await detailedadd(this.detailed)
      console.log(res._id)
      this.ordersdata.detailed = res._id
      orderedit(this.ordersdata._id, this.ordersdata)
    },
    // 计算菜单详情表总价
    getSummaries(param) {
      const { data } = param
      const sum = []
      const sums = []
      data.map((item) => {
        sum.push(item.number * item.price)
      })
      const s = sum.reduce((acc, cur) => acc + cur, 0)
      sums[0] = '总价'
      sums[2] = s
      this.ordersdata.total = s
      this.menu.total = s
      return sums
    },
    // 加菜下拉触发事件
    async input(callback) {
      if (callback) {
        this.add = this.menus.filter((item) => {
          if (this.ordersdata.menus.indexOf(item._id) === -1) {
            return item
          }
        })
        console.log('点击', callback)
      } else {
        await this.newly.forEach((item) => {     
          this.ordersdata.menus.push(item)  
        })
        console.log(`新的ID`, this.ordersdata.menus)

        this.zj = await this.add.filter((item) => {
          if (!(this.newly.indexOf(item._id) === -1)) {
            return item
          }
        })
        console.log('再次循环的值', this.zj)
        await this.zj.forEach((item) => {
          this.detailed.push({
            _id: item._id,
            name: item.name,
            number: 1,
            price: item.price
          })
        })
        this.newly = []
        console.log('离开', callback)
      }
    },
    async detailedDelete(index, row) {
      this.detailed = await this.detailed.filter((item) => {
        if (row._id.indexOf(item._id) === -1) {
          return item
        }
      })
      this.ordersdata.menus = await this.ordersdata.menus.filter((item) => {
        if (row._id.indexOf(item) === -1) {
          return item
        }
        console.log(item)
      })
    },
    async aaaa() {
      this.query.key = '肉类'
      console.log(this.query)
      meunList(this.query).then((response) => {
        const res = response
        console.log('144', res)
      })
    },
    async Seat() {
      let a = []
      a = await this.seats.filter((item) => {
        if (this.ordersdata.seats.indexOf(item._id) === -1) {
          return item
        }
      })
      this.seat = a
    },
    // 替换座位 修改座位状态
    async exchange(index, row) {
      this.ordersdata.seats = row._id
      this.seatedName = row.name
      const { ...seated } = row
      this.seated = seated 
      this.seated.state = '用餐中'
      this.seated.coaches = this.ordersdata.detailed
      this.alter = true
      this.Seat()
      console.log('x', this.seated._id)
      console.log('x', this.seated)
    },
    async replace() {
      const { ...state } = this.seated
      this.state = state
      this.state[0]['state'] = '空闲'
      this.state[0]['coaches'] = []
      console.log('j', this.state)
    },
    beforeAvatarUpload(file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    async exceed() {
      this.$message.error('最多只能上传9张图片')
    },
    handleSuccess(jsonData) { // 上传图片成功传给后台的数据
      this.ordersdata.icon.push({
        name: jsonData,
        url: jsonData
      });
    },
    handleRemove(file, fileList) { // 移除图片传给后台的数据
      this.ordersdata.icon = fileList
    },
    handlePictureCardPreview(file) { // 点击放大图片
      this.dialogImageUrl = file.url;
      this.zp = true;
    }
  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
