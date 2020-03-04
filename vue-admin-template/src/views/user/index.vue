<template>
  <div>
    {{ users }}
    <el-table
      :data="users"
      style="width: 100%"
    >
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height:3em;">
        </template>
      </el-table-column>
      <el-table-column prop="gradae" label="等级"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
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
          />>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row), (dialogVisible = true)"
          >
            Edit
          </el-button>
          <el-dialog
            title="用户详情"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            center
          >
            {{ usersdata }}
            <el-form :v-model="usersdata">
              <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input
                  v-model="usersdata.username"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input
                  v-model="usersdata.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="等级" :label-width="formLabelWidth">
                <el-select v-model="usersdata.gradae" placeholder="请选择等级">
                  <el-option label="普通会员" value="普通会员"></el-option>
                  <el-option label="超级会员" value="超级会员"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="头像" :label-width="formLabelWidth">
                <el-upload
                  class="avatar-uploader"
                  :action="BASEURL + 'upload'"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="usersdata.avatar" :src="usersdata.avatar" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
              <el-form-item
                label="性别"
                :label-width="formLabelWidth"
              >
                <el-radio v-model="usersdata.gender" label="男">男</el-radio>
                <el-radio v-model="usersdata.gender" label="女">女</el-radio>
              </el-form-item>  
              <el-form :v-model="usersdata" label-width="100px">
                <el-form-item
                  prop="password"
                  label="密码"
                  :rules="rules2.password"
                >
                  <el-input v-model="usersdata.password" show-password></el-input>
                </el-form-item>
                <el-form-item
                  prop="email"
                  label="邮箱"
                  :rules="[
                    { message: '请输入邮箱地址', trigger: 'blur' },
                    {
                      type: 'email',
                      message: '请输入正确的邮箱地址',
                      trigger: ['blur', 'change']
                    }
                  ]"
                >
                  <el-input v-model="usersdata.email"></el-input>
                </el-form-item>
                <el-form-item
                  prop="phone"
                  label="手机号"
                  :rules="rules2.phone"
                >
                  <el-input v-model="usersdata.phone"></el-input>
                </el-form-item>
              </el-form>
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
import { userList, userdata, upedit, upremove } from '@/api/user'
import request from '@/utils/request'
export default {
  name: 'Dashboard',
  data() {
    //   信息验证计算
    var phone = (rule, value, callback) => {
      const reg = /^1[34578]\d{9}$/
      if (value === '') {
        callback(new Error('请输手机号'));
      } else {
        if (!reg.test(value)) {
          return callback(new Error('手机号不正确'))
        }
        callback();
      }
    };
    var password = (rule, value, callback) => {
      const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/;
      if (value === '') {
        callback(new Error('请输密码'));
      } else {
        if (!reg.test(value)) {
          return callback(new Error('请输入8为切字母开头的密码'))
        }
        callback();
      }
    };
    return {
      BASEURL: request.defaults.baseURL, // 文件上传URL
      rules2: {
        phone: [{ validator: phone, trigger: 'blur' }],
        password: [{ validator: password, trigger: 'blur' }]
      },
      users: [],
      search: '',
      dialogVisible: false, // 是否打开用户详情
      formLabelWidth: '120px',
      usersdata: {
        username: '', // 用户名
        name: '', // 名称
        avatar: '', // 头像
        gender: '', // 性别
        gradae: '', // 等级
        password: '', // 密码
        email: '', // 邮箱
        phone: '' // 手机号
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
      }
    }
  },
  computed: {
  },
  created() {
    this.user()
  },
  methods: {
    async user() {
      userList(this.query).then((response) => {
        this.users = response.list
        this.page.count = response.count
      })
    },
    changePage(val) {
      this.query.page = val
      console.log('当前页：', val, 'query数据：', this.query)
      this.fetchmenu(this.query)
    },
    // 搜索
    async searchMethod() {
      const query = Object.assign({}, this.query)
      const res = await userList(query)
      if (res) {
        this.users = res.list
        this.page.count = res.count
      } else {
        this.$message.info('请检查输入内容')
      }
    },
    // 编辑按钮
    async handleEdit(index, row, data) {
      userdata(`${row._id}`, data).then((data) => {
        this.usersdata = data
        console.log(data)
      })
    },
    // 删除按钮
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {   
        upremove(`${row._id}`).then((result) => {
          this.user()
          this.$message({
            type: 'success',
            message: result.message
          })
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 保存
    async handleClose() {
      this.$confirm('是否保存？')
        .then((_) => {
          upedit(this.usersdata._id, this.usersdata).then((result, res) => {
            this.user()
            this.$message({
              type: 'success',
              message: result.message
            });
          })
          this.dialogVisible = false
        })
        .catch((_) => {
          this.dialogVisible = false
          this.$message({
            message: '放弃保存并离开页面'
          })
        });
    },
    // 头像上传控件
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
</style>
