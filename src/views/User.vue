<template>
  <div class="manage">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        @opened="clearFormContent"
        width="35%">
      <!--用户表单信息-->
      <el-form inline :rules="rules" ref="form" :model="form" label-width="80px">
        <!--姓名-->
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <!--年龄-->
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <!--性别下拉选项-->
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <!--出生日期下拉选项-->
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker :editable="false" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                          v-model="form.birth">
          </el-date-picker>
        </el-form-item>
        <!--地址-->
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="handleAdd">
        + 新增
      </el-button>
      <!--form搜索区域-->
      <el-form :model="userForm" inline>
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table
          height="71%"
          stripe
          :data="tableData"
          style="width: 100%">
        <el-table-column
            align="left"
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column
            align="center"
            prop="sex"
            label="性别">
          <template v-slot="scope">
            <span>{{ scope.row.sex == 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            prop="age"
            label="年龄">
        </el-table-column>
        <el-table-column
            align="center"
            prop="birth"
            label="出生日期">
        </el-table-column>
        <el-table-column
            align="center"
            prop="addr"
            label="地址">
        </el-table-column>
        <el-table-column
            align="center"
            prop="addr"
            label="操作">
          <template v-slot="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页器-->
      <div class="pager">
        <el-pagination
            layout="->, jumper, prev, pager, next, total"
            :total="total"
            @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from '@/api/index.js'
import { left } from 'core-js/internals/array-reduce'

export default {
  name: 'User',
  data () {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名' },
        ],
        age: [
          { required: true, message: '请输入年龄' },
        ],
        sex: [
          { required: true, message: '请选择性别' },
        ],
        birth: [
          { required: true, message: '请选择出生日期' },
        ],
        addr: [
          { required: true, message: '请输入地址' },
        ],
      },
      tableData: [],
      modelType: 0,   // 0表示新增的弹窗，1表示编辑的弹窗
      total: 0,   // 代表当前数据的总条数
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: '',
      },
    }
  },
  methods: {
    left,
    // 提交用户表单
    submit () {
      /* validate
      * 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，
      * 并传入两个参数：是否校验成功和未通过校验的字段。
      * 若不传入回调函数，则会返回一个 promise
      *  */
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modelType === 0) {
            addUser(this.form).then(() => {
              // 重新获取列表的接口
              this.getList()
            })
          } else {
            editUser(this.form).then(() => {
              // 重新获取列表的接口
              this.getList()
            })
          }
          // this.handleClose()
          // 关闭弹窗
          this.dialogVisible = false
        }
      })
    },
    // 弹窗关闭时的处理逻辑
    handleClose () {
      // this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    // 点击新增时的操作
    handleAdd () {
      this.modelType = 0
      this.dialogVisible = true
    },
    // 点击新增时清除之前填写的表单内容
    clearFormContent () {
      this.$refs.form.resetFields()
    },
    // 编辑数据
    handleEdit (row) {
      this.modelType = 1
      this.dialogVisible = true
      // 注意需要对当前行进行深拷贝，否则会出错
      this.form = JSON.parse(JSON.stringify(row))
    },
    // 删除数据
    handleDelete (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        delUser({ id: row.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          // 重新获取列表的接口
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })
      })
    },
    // 获取列表的数据
    getList () {
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(({ data }) => {
        this.tableData = data.list
        this.total = data.count || 0
      })
    },
    // 选择页码的回调函数, val 是当前所在的页码数
    handlePage (val) {
      this.pageData.page = val
      this.getList()
    },
    // 列表的查询
    onSubmit () {
      this.getList()
    },
  },
  mounted () {
    this.getList()
  },
}
</script>

<style lang="less" scoped>
.manage {
  height: 90%;

  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .common-table {
    height: calc(100% - 62px);
  }
}
</style>
