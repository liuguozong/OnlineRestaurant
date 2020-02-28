<template>
  <el-table
    :data="
      menus.filter((menus) => !search || menus.name.toLowerCase().includes(search.toLowerCase()))
    "
    style="width: 100%"
  >
    <el-table-column prop="_id" label="id"></el-table-column>
    <el-table-column prop="name" label="菜名"></el-table-column>
    <el-table-column prop="genre" label="类别"></el-table-column>
    <el-table-column prop="icon" label="图片">
      <template slot-scope="scope">
        <img :src="scope.row.icon" style="height:3em;" />
      </template>
    </el-table-column>
    <el-table-column prop="price" label="价钱"></el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-button type="primary" @click="(addmenu,(dialogVisible = true))">主要按钮</el-button>
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row), (dialogVisible = true)">
          Edit
        </el-button>
        <el-dialog
          :title="!menusdata._id ? '新增菜单' : '修改菜单'"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
          center
        >
          {{ menusdata }}
          <el-form :model="menusdata">
            <el-form-item label="名称">
              <el-input
                v-model="menusdata.name"
                autocomplete="off"
                clearable
                style="width:200px"
              ><svg-icon slot="prefix" icon-class="huoguo" /></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-cascader
                v-model="menusdata.genre"
                :options="options"
                placeholder="类型"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="图片" :model="menusdata">
              <el-upload
                class="avatar-uploader"
                :action="BASEURL + 'upload'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="menusdata.avatar" :src="menusdata.avatar" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
            <el-form-item label="价格">
              <el-input
                v-model="menusdata.price"
                clearable
                placeholder="请输入菜品价格"
                style="width:150px"
              ><svg-icon slot="prefix" icon-class="qianmoney" /></el-input>
            </el-form-item>
            <el-form-item label="标签">
              <el-input
                v-model="menusdata.label"
                type="textarea"
                autosize
                placeholder="请输入菜品标签"
                style="width:400px"
              ></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input
                v-model="menusdata.depict"
                type="textarea"
                autosize
                placeholder="请输入菜品描述"
                style="width:400px"
              ></el-input>
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
import { meunList, menudata, menuremove, menuedit, menuadd } from '@/api/menu'
import request from '@/utils/request'
export default {
  data() {
    return {
      BASEURL: request.defaults.baseURL, // 文件上传URL
      menus: [],
      menusdata: {
        name: '',
        icon: '',
        genre: '',
        price: '',
        label: '',
        depict: ''
      },
      search: '',
      dialogVisible: false, // 是否打开用户详情
      formLabelWidth: '120px',
      options: [
        {
          value: '锅底',
          label: '锅底'
        },
        {
          value: '涮菜',
          label: '涮菜',
          children: [
            {
              value: '肉类',
              label: '肉类'
            },
            {
              value: '河鲜海鲜',
              label: '河鲜海鲜'
            },
            {
              value: '丸滑类',
              label: '丸滑类'
            },
            {
              value: '蔬菜类',
              label: '蔬菜类'
            },
            {
              value: '豆面制品类',
              label: '豆面制品类'
            },
            {
              value: '菌菇类',
              label: '菌菇类'
            }
          ]
        },
        {
          value: '特色蘸料',
          label: '特色蘸料'
        },
        {
          value: '小吃甜品',
          label: '小吃甜品'
        },
        {
          value: '特色饮品',
          label: '特色饮品'
        }
      ]
    }
  },
  created() {
    this.menu()
  },
  methods: {
    async menu() {
      meunList().then((data) => {
        this.menus = data
      })
    },
    // 编辑按钮
    async handleEdit(index, row, data) {
      menudata(`${row._id}`, data).then((data) => {
        this.menusdata = data
        console.log(this.menusdata)
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
          menuremove(`${row._id}`).then((result) => {
            this.menu()
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
          this.menu()
          if (this.menusdata._id) {
            menuedit(this.menusdata._id, this.menusdata).then((result) => {
              this.$message({
                type: 'success',
                message: result.message
              })
              this.menusdata = {}
            })
          } else {
            this.menu()
            menuadd(this.menusdata).then((result) => {
              this.$message({
                type: 'success',
                message: result.message
              })
            })
          }
          this.menusdata = {}
          this.dialogVisible = false
        })
        .catch((_) => {
          this.dialogVisible = false
          this.menusdata = {}
          this.$message({
            message: '放弃保存并离开页面'
          })
        })
    },
    // 菜品图片上传控件
    handleAvatarSuccess(res, file) {
      this.$set(this.usersdata, 'avatar', res)
      this.$message.success('上传成功!')
      console.log(this.usersdata.avatar)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    async addmenu() {
      this.menusdata = {}
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
