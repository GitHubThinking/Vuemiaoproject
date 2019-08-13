<template>
  <div style="margin-top:50px;">
    <div>
      邮箱：<input v-model="email" type="text"> <button @touchstart="handleToVerify">发送验证码</button>
    </div>
    <div>
      新密码： <input v-model="password" type="password">
    </div>
    <div>
      验证码：<input v-model="verify" type="text">
    </div>
    <div>
      <button @touchstart="handleToPassword">修改</button>
    </div>
    <div class="">
      <router-link to="/mine/login">立即登录</router-link>
      <router-link to="/mine/register">立即注册</router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "updatePassword",
  data() {
    return {
      email: "",
      password: "",
      verify: ""
    };
  },
  methods: {
    handleToVerify() {
      this.axios.get("/api2/users/verify?email=" + this.email).then(res => {
        var status = res.data.status;
        if (status === 0) {
          console.log("验证码已发送");
        } else {
          console.log("验证码发送失败");
        }
      });
    },
    handleToPassword() {
        this.axios.post('/api2/users/updatePassword',{
            email:this.email,
            password:this.password,
            verify:this.verify
        }).then((res)=>{
            var status = res.data.status
            if(status === 0){
                console.log('密码修改成功')
                this.$router.push('/mine/login')
            }else{
                console.log('密码修改失败')
            }
        })
    }
  }
};
</script>

<style scoped>
</style>