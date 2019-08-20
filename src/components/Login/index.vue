<template>
  <div class="login_body">
    <div>
      <input v-model="username" class="login_text" type="text" placeHolder="账户名/手机号/Email">
    </div>
    <div>
      <input v-model="password" class="login_text" type="password" placeHolder="请输入您的密码">
    </div>
    <div class="login_btn">
      <input type="submit" @touchstart="handleTologin" value="登录">
    </div>
	<div>
		<input type="text" v-model="verifyImg" placeholder="请输入验证码"><img @touchstart="handleToVerifyImg" src="/api2/users/verifyImg"x alt="">
	</div>
    <div class="login_link">
		<router-link to="/mine/register" >立即注册</router-link>
		<router-link to="/mine/updatePassword">找回密码</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
	  password: "",
	  verifyImg:""
    };
  },
  methods: {
    handleTologin() {
      this.axios
        .post("/api2/users/login", {
          username: this.username,
		  password: this.password,
		  verifyImg:this.verifyImg
        })
        .then(res => {
          var status = res.data.status;
          if (status === 0) {
			console.log('数据返回成功');
			this.$router.push('/mine/center')
          }else {
			console.log('数据返回失败');  
		  }
        });
	},
	handleToVerifyImg(ev){
		ev.target.src = '/api2/users/verifyImg?'+Math.random()
	}
  }
};
</script>

<style scoped>
#content .login_body {
  margin-top: 50px;
  width: 100%;
}
.login_body .login_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
}
.login_body .login_btn {
  height: 50px;
  margin: 10px;
}
.login_body .login_btn input {
  width: 100%;
  height: 100%;
  background: #e54847;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}
.login_body .login_link {
  display: flex;
  justify-content: space-between;
}
.login_body .login_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #e54847;
}
</style>