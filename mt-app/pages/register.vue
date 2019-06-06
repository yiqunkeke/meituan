<template>
   <div class="page-register">
    <article class="header">
        <header>
            <a href="/" class="site-logo"></a>
            <span class="login">
                <em class="bold">已有美团账号？</em>
                <a href="/login">
                    <el-button type="primary" size="small">登录</el-button>
                </a>
            </span>
        </header>
    </article>
    <section>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="昵称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
                <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
                <span class="status">{{statusMsg}}</span>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-input v-model="ruleForm.code" maxlength="4"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input v-model="ruleForm.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="cpwd">
                <el-input v-model="ruleForm.cpwd" type="password"></el-input>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" @click="register">同意以下协议并注册</el-button>
                <div class="error">{{error}}</div>
            </el-form-item>
            <el-form-item>
                <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
            </el-form-item>
        </el-form>
    </section>
   </div>
</template>

<script>
import CryptoJS from 'crypto-js'; // 这个包用来加密（通常使用它的 md5）
export default {
  layout: "blank",
  data() {
    return {
      statusMsg: "",
      error: "",
      ruleForm: {
        name: "",
        email: "",
        code: "",
        pwd: "",
        cpwd: ""
      },
      rules: {
        name: [
          {
            required: true,
            type: "string",
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "请输入邮箱",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "创建密码",
            trigger: "blur"
          }
        ],
        cpwd: [
          {
            required: true,
            message: "确认密码",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
                if(value===""){
                    callback(new Error("请再次输入密码"))
                } else if(value!==this.ruleForm.pwd) {
                    callback(new Error("两次输入密码不一致"))
                } else {
                    callback()
                }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    sendMsg() {
        const self = this;
        let namePass
        let emailPass
        if(self.timerid) {
            return false
        } 
        // 验证用户名是否通过
        this.$refs['ruleForm'].validateField('name', (valid)=>{
            namePass = valid
        })
        self.statusMsg = ""
        if(namePass) {
            return false
        }
        // 验证邮箱是否通过
        this.$refs['ruleForm'].validateField('email', (valid)=>{
            emailPass = valid
        })
        // validateField()为 element-ui自带方法，用来对部分表单字段进行校验的方法
        if(!namePass && !emailPass) {
            // 表示用户名和邮箱都通过

            self.$axios.post('/users/verify', {  // 这里可以直接使用vue实例上的$axios是因为：在nuxt.config.js中，我们在module中引入了 axios 模块（相当于把$axios挂载到了vue 实例上）
                username: encodeURIComponent(self.ruleForm.name),
                email: self.ruleForm.email
            }).then(({
                status, 
                data
                }) => {
                if(status===200 && data && data.code===0){
                    let count = 60;
                    self.statusMsg = `验证码已发送，剩余${count--}秒`
                    self.timerid = setInterval(function() {
                        self.statusMsg = `验证码已发送，剩余${count--}秒`
                        if(count === 0) {
                            clearInterval(self.timerid)
                        }
                    }, 1000)
                } else {
                    self.statusMsg = data.msg
                }
            })
        }

    },
    register() {
        let self = this;
        this.$refs['ruleForm'].validate((valid) => {
            if(valid) {
                self.$axios.post('/users/signup', {
                    username: window.encodeURIComponent(self.ruleForm.name), // 用户名有可能输入的是中文，所以这里需要使用 encodeURIComponent()
                    password: CryptoJS.MD5(self.ruleForm.pwd).toString(), // 注意：1. MD5()方法一定要使用大写。2.加密之后是数组，一定要再使用toString()方法。
                    email: self.ruleForm.email,
                    code: self.ruleForm.code
                }).then(({status, data}) => {
                    if(status === 200) {
                        if(data && data.code ===0){
                            // 注册成功
                            location.href = '/login'
                        } else {
                            // 注册失败
                            self.error = data.msg
                        }
                    } else {
                        self.error = `服务器出错，错误码：${status}`
                    }

                    // 定时清空 error 信息
                    // (因为我们一直在对 error 进行赋值，导致error里面一直有值)
                    setTimeout(function() {
                        self.error = ""
                    }, 3000)

                })
            }
        })
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>
