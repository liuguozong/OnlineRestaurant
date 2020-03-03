<template>
  <el-table
    :data="
      orders.filter((orders) => !search || orders.name.toLowerCase().includes(search.toLowerCase()))
    "
    style="width: 100%"
  >
    <el-table-column prop="_id" label="id"></el-table-column>
    <el-table-column label="用户名">
      <template slot-scope="scope">
        <span v-for="item in scope.row.user" :key="item._id" :value="item.name" :prop="item.name">
          {{ item.name }}
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="mode" label="支付方式"></el-table-column>
    <el-table-column prop="price" label="应付金额"></el-table-column>
    <el-table-column align="right">
      <template slot="header">
        <el-button type="primary" @click="dialogVisible = true">主要按钮</el-button>
        <el-input
          v-model="search" 
          size="mini"
          placeholder="输入关键字搜索" 
          clearable
        />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row), (dialogVisible = true)">
          Edit
        </el-button>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          {{ ordersdata.seats }}
          <el-form v-model="o">
            <el-form-item label="用户">
              <el-input v-model="o" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="座位">
              <el-select v-model="ordersdata.seats" multiple>
                <el-option
                  v-for="item of seats"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-collapse>
              <el-collapse-item title="菜单详情">
                {{ ordersdata.menus }}
                <el-form-item label="菜单">
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
                {{ detailed }}
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
              </el-collapse-item>
            </el-collapse>
          </el-form>
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
</template>
<script>
import { orderList, orderdata, orderedit, orderremove, detailedadd, detaileddit } from '@/api/order'
import { userList } from '@/api/user'
import { meunList } from '@/api/menu'
import { seatList } from '@/api/seat'
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
      seats: [],
      detailed: [],
      detaileds: [],
      add: [],
      zj: [],
      newly: [],
      o: '',
      ordersdata: {
        user: '',
        menus: '',
        seat: '',
        evaluate: '',
        icon: '',
        taste: '',
        service: '',
        surroundings: '',
        state: '',
        price: '',
        Mode: '',
        remarks: ''
      },
      search: '',
      dialogVisible: false, // 是否打开用户详情
      formLabelWidth: '120px'
    }
  },
  created() {
    this.oreder()
  },
  methods: {
    async oreder() {
      orderList().then((data) => {
        this.orders = data
        console.log('获取的所有订单数据', data)
      })
    },
    // 编辑按钮
    async handleEdit(index, row, data) {
      const res = await orderdata(`${row._id}`, data)
      this.ordersdata = Object.assign({}, this.ordersdata, res.data)
      this.menu = res.detailed['detailed'][0]
      this.detailed = res.detailed.detailed[0]['menu']
      meunList().then((data) => {
        this.menus = data.flat(Infinity)
      })
      userList().then((data) => {
        this.users = data.flat(Infinity)
      })
      seatList().then((data) => {
        this.seats = data
      })
      this.o = this.ordersdata.user[0]['name']
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
            console.log(`保存的订单数据`, this.ordersdata)
            this.ordersdata = {}
            this.oreder()
          })
          this.dialogVisible = false
        })
        .catch((_) => {
          this.dialogVisible = false
          this.ordersdata = {}
          this.$message({
            message: '放弃保存并离开页面'
          })
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
      this.ordersdata.total = sums[1]
      this.menu.total = sums[1]
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
  border-color: #409eff;
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
.add {
  left: 300px;
}
</style>
