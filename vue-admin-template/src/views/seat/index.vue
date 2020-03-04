<template>
  <div>
    <el-table
      :data="seats"
      style="width: 100%"
    >
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="name" label="座位名"></el-table-column>
      <el-table-column prop="max" label="可容纳人数"></el-table-column>
      <el-table-column prop="state" label="当前状态"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" @click="addmenu, (dialogVisible = true)">主要按钮</el-button>
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
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-form :model="seatsdata">
              <el-tabs type="card" name="1">
                <el-tab-pane label="座位信息">
                  <el-form-item label="座位名">
                    <el-input v-model="seatsdata.name" placeholder="请输入座位名"></el-input>
                  </el-form-item>
                  <el-form-item label="可容纳人数">
                    <el-input v-model="seatsdata.max" placeholder="可容纳人数"></el-input>
                  </el-form-item>
                  <el-form-item label="当前状态">
                    <el-select v-model="seatsdata.state" placeholder="请选择状态">
                      <el-option label="空闲" value="空闲"></el-option>
                      <el-option label="预定" value="预定"></el-option>
                      <el-option label="用餐中" value="用餐中"></el-option>
                    </el-select>
                  </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="订单详情">订单详情</el-tab-pane>
              </el-tabs>
              {{ seatsdata }}
        
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
import { seatList, seatdata, seatedit, seatremove, seateadd } from '@/api/seat'
import request from '@/utils/request'
export default {
  data() {
    return {
      BASEURL: request.defaults.baseURL, // 文件上传URL
      seats: [],
      seatsdata: {
        name: '',
        max: '',
        state: '',
        coaches: ''
      },
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
      search: '',
      dialogVisible: false,
      formLabelWidth: '120px'
    }
  },
  created() {
    this.seat()
  },
  methods: {
    async seat() {
      seatList(this.query).then((response) => {
        this.seats = response.list
        this.page.count = response.count
      })
    },
    // 分页
    changePage(val) {
      this.query.page = val
      console.log('当前页：', val, 'query数据：', this.query)
      this.seat(this.query)
    },
    // 搜索
    async searchMethod() {
      const query = Object.assign({}, this.query)
      const res = await seatList(query)
      if (res) {
        this.seats = res.list
        this.page.count = res.count
      } else {
        this.$message.info('请检查输入内容')
      }
    },
    // 编辑按钮
    async handleEdit(index, row, data) {
      seatdata(`${row._id}`, data).then((data) => {
        this.seatsdata = data
        console.log(this.seatsdata)
      })
    },
    // 删除按钮
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          seatremove(`${row._id}`).then((result) => {
            this.seat()
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
          if (this.seatsdata._id) {
            console.log(this.seatsdata)
            seatedit(this.seatsdata._id, this.seatsdata).then((result) => {
              console.log(this.seatsdata)
              this.$message({
                type: 'success',
                message: result.message
              })
              this.seatsdata = {}
              this.seat()
            })
          } else { 
            seateadd(this.seatsdata).then((result) => {
              this.$message({
                type: 'success',
                message: result.message
              })
            })
            this.seat()
          }
          this.seatsdata = {}
          this.dialogVisible = false
        })
        .catch((_) => {
          this.dialogVisible = false
          this.seatsdata = {}
          this.$message({
            message: '放弃保存并离开页面'
          })
        })
    },
    async addmenu() {
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
