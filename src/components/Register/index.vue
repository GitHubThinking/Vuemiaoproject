<template>
  <div style="margin-top:50px;">
    <div>
      邮箱：<input v-model="email" type="text"> <button :disable='disabled' @touchstart="handleToVerify">{{verifyInfo}}</button>
    </div>
    <div>
      用户名：<input v-model="username" type="text">
    </div>
    <div>
      密码：<input v-model="password" type="password">
    </div>
    <div>
      确认密码：<input type="password">
    </div>
    <div>
      验证码：<input v-model="verify" type="text">
    </div>
    <div>
      <button @touchstart="handleToRegister">注册</button>
    </div>
    <div class="login_link">
      <router-link to="/mine/login">立即登录</router-link>
      <router-link to="/mine/updatePassword">找回密码</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      verify: "",
      verifyInfo: "发送验证码",
      disabled: false
    };
  },
  methods: {
    handleToVerify() {
      if (this.disabled) {
        return;
      }
      this.axios.get("/api2/users/verify?email=" + this.email).then(res => {
        var status = res.data.status;
        if (status === 0) {
          console.log("验证码已发送");
          this.countDown()
        } else {
          console.log("验证码发送失败");
        }
      });
    },
    handleToRegister() {
      this.axios
        .post("/api2/users/register", {
          email: this.email,
          username: this.username,
          password: this.password,
          verify: this.verify
        })
        .then(res => {
          var status = res.data.status;
          if (status === 0) {
            console.log("注册成功");
            this.$router.push("/mine/login");
          } else {
            console.log("注册失败");
            console.log("失败原因" + res.data.msg);
          }
        });
    },
    countDown(){
        this.disabled = true;
        var count = 5;
        console.log(timers)
        var timers = setInterval(()=>{
            count--;
            this.verifyInfo = '剩余'+count+'秒'    
            if(count <= 0){      
                this.disabled = false
                count = 5
                this.verifyInfo = '发送验证码'
                clearInterval(timers)    // 注意这里有一个细节就是它得,在使用clear...的时候一定检查一下是否import了clear...
            }
        },1000)
    }
  }
};
</script>

<style scoped>
</style>