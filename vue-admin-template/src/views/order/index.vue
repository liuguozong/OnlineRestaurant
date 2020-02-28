<template>
  <el-table
    :data="
      orders.filter((orders) => !search || orders.name.toLowerCase().includes(search.toLowerCase()))
    "
    style="width: 100%"
  >
    <el-table-column prop="_id" label="id"></el-table-column>
    <el-table-column prop="user.name" label="用户名"></el-table-column>
    <el-table-column prop="mode" label="支付方式"></el-table-column>
    <el-table-column prop="price" label="应付金额"></el-table-column>
    <el-table-column align="right">
      <template slot="header">
        <el-button type="primary" @click="(add,(dialogVisible = true))">主要按钮</el-button>
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
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
          {{ o }} 
          <el-form v-model="ordersdata">
            <el-form-item label="用户">
              <el-input
                v-model="o"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="座位"
            >
              <el-select v-model="ordersdata.seats" multiple>
                <el-option
                  v-for="item of seats"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单">
              <el-select v-model="ordersdata.menus" filterable multiple>
                <el-option
                  v-for="item of menus"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                >
                </el-option>
              </el-select>
            </el-form-item>
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
import { orderList, orderdata, orderedit, orderremove } from '@/api/order'
import { userList } from '@/api/user'
import { meunList } from '@/api/menu'
import { seatList } from '@/api/seat'
import request from '@/utils/request'
export default {
  data() {
    return {
      BASEURL: request.defaults.baseURL, // 文件上传URL
      orders: [],
      users: [],
      menus: [],
      seats: [],
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
        console.log(data)
      })
    },
    // 编辑按钮
    async handleEdit(index, row, data) {
      const res = await orderdata(`${row._id}`, data)
      this.ordersdata = Object.assign({}, this.ordersdata, res)
      this.o = this.ordersdata.user[0]['name']
      console.log(this.o)
      meunList().then((data) => {
        this.menus = data.flat(Infinity)
      })
      userList().then((data) => {
        this.users = data.flat(Infinity)
      })
      seatList().then((data) => {
        this.seats = data
      })
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
            console.log(result.message)
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
          this.ordersdata.user = this.o 
          orderedit(this.ordersdata._id, this.ordersdata).then((result) => {
            this.$message({
              type: 'success',
              message: result.message
            })
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
          console.log(this.ordersdata)
        })
    },
    async add() {
      console.log(1)
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
