<template>
  <el-table
    :data="
      seats.filter((menus) => !search || seats.name.toLowerCase().includes(search.toLowerCase()))
    "
    style="width: 100%"
  >
    <el-table-column prop="_id" label="id"></el-table-column>
    <el-table-column prop="name" label="座位名"></el-table-column>
    <el-table-column prop="max" label="可容纳人数"></el-table-column>
    <el-table-column prop="state" label="当前状态"></el-table-column>
    <el-table-column align="right">
      <template slot="header">
        <el-button type="primary" @click="addmenu, (dialogVisible = true)">主要按钮</el-button>
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
          {{ seatsdata }}
          <el-form :model="seatsdata">
            <el-form-item label="座位名">
              <el-input v-model="seatsdata.name" placeholder="请输入座位名"></el-input>
            </el-form-item>
            <el-form-item label="可容纳人数">
              <el-input v-model="seatsdata.max" placeholder="可容纳人数"></el-input>
            </el-form-item>
            <el-form-item label="当前状态">
              <el-input v-model="seatsdata.state" placeholder="当前状态"></el-input>
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
      seatList().then((data) => {
        this.seats = data.flat()
      })
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
