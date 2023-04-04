<template>
  <div>
      <el-form :model="form" :rules="rules" class="login-contain" inline label-position="right" label-width="70px">
        <h3 class="login-title">系统登陆</h3>
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="form.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-top: 10px;" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { min: 5, max: 8, trigger: 'blur', message: '长度在 5 到 8 个字符' },
        ],
      },
    }
  },
}
</script>

<style lang="less" scoped>
.login-contain {
  box-sizing: border-box;
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  text-align: center;
  .login-title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
  .el-input {
    width: 198px;
  }
}
</style>
