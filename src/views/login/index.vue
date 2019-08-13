<!--  -->
<template>
  <div class="container">
    <el-card class="my-card">
      <!-- logo -->
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:218px;margin-right:30px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login('loginForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 自定义校验函数
    const checkMobile = (rule, value, callback) => {
      // 按照自己校验的逻辑去校验value值即可
      // 手机号格式 1开头 第二位3-9 最后9位数即可
      if (!/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(value)) {
        return callback(new Error('手机格式不对'))
      }
      callback()
    }
    return {
      // 表单的数据对象
      loginForm: {
        // 字段参考 后端的接口文档
        mobile: '',
        code: ''
      },
      // 校验规则对象
      loginRules: {
        // 定义关于mobile和code校验规则
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 1. 对整个表单进行校验
      this.$refs.loginForm.validate((vaild) => {
        if (vaild) {
          console.log('ok')
          // 2. 校验成功发起登陆请求
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm).then(res => {
            // res 是响应对象 res.data数据属于响应体
            // console.log(res.data)
            this.$router.push('/')
          }).catch(() => {
            // 请求失败 提示手机号或验证码错误
            this.$message.error('手机号或验证码错误')
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  width: 100%;
  height: 100%;
  //设置绝对定位 其上级没有设置定位会自动window的宽高成为全屏容器
  position: absolute;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .my-card {
    width: 400px;
    height: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    img {
      display: block;
      width: 200px;
      margin: 0 auto 30px;
    }
  }
}
</style>
