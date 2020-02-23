<style>
html,body {
    width: 100%;
    height: 100%;
    background-color: #1c2438;
}
.login {
    width: 100%;
    height: 100%;
    background-color: #1c2438;
    position: relative;
}
.login .from-wrap{
    position: fixed;
    left: 50%;
    margin-left: -200px;
    top: 50%;
    margin-top: -150px;
    width: 400px;
    height: 240px;
    border-radius: 10px;
    background-color: #fff;
    padding: 20px 30px;
}
.login h2 {
    text-align: center;
    margin-bottom: 20px;
}
.login FormItem {
    margin-bottom: 15px;
}
.login .form-footer {
    text-align: right;
}
.ivu-form-item-required .ivu-form-item-label:before {
    display: none;
}
</style>
<template>
    <div class="login">
        <div class="from-wrap">
            <h2>登录</h2>
            <Form ref="loginData" :model="loginData" :rules="ruleValidate" :label-width="90">
                <FormItem label="Account" prop="Account">
                    <i-input type="password" v-model="loginData.Account" placeholder="请输入账号"></i-input>
                </FormItem>
                <FormItem label="Password" prop="Password" >
                    <i-input type="password" v-model="loginData.Password" placeholder="请输入密码"></i-input>
                </FormItem>
                <FormItem class="form-footer">
                    <Button type="primary" @click="handleSubmit('loginData')">Submit</Button>
                    <Button  @click="handleReset('loginData')" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loginData: {
        Account: '',
        Password: ''
      },
      ruleValidate: {
        Account: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 16, message: '账号长度3-16个字符', trigger: 'blur' }
        ],
        Password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', min: 6, max: 16, message: '密码长度6-16个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    handleSubmit (name) {
      console.log(name)
      this.$refs[name].validate((valid) => {
        console.log(valid)
        if (valid) {
          // this.$Message.success('提交成功!')
          this.login({
            Account: this.loginData.Account,
            Password: this.loginData.Password
          }).then(() => {
            console.log('loginVue--success')
            this.$router.push({
              name: 'home'
            })
          }).catch(error => {
            if (error.Message !== undefined) { this.$Message.error(error.Message) } else { this.$Message.error(error.message) }
          })
        } else {
          this.$Message.error('登录失败!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
