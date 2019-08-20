<template>
  <div>
    <div style="margin-top:50px;">
      个人中心<button @touchstart="handleToLogout">退出</button>
    </div>
    <div>
      <div v-if="$store.state.user.isAdmin">当前管理员：{{$store.state.user.name}} <a href="/admin" target="_blank">进入管理后台</a></div>
      <div v-else>当前用户：{{$store.state.user.name}}</div>
    </div>
    <div>
      <input type="file" name="file" value="上传头像" @change="handleToUpload">
      <img :src="$store.state.user.userHead" alt="" style="width:100px;height:100px;border-radius:50%;">
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "center",
  data() {
    return {};
  },
  methods: {
    handleToLogout() {
      this.axios.get("/api2/users/logout").then(res => {
        var status = res.data.status;
        console.log(res.data);
        if (status === 0) {
          localStorage.removeItem("name");
          localStorage.removeItem("isAdmin");
          this.$store.commit("USER_NAME", {
            name: "",
            isAdmin: "",
            userHead: ""
          });
          this.$router.push("/mine/login");
        }
      });
    },
    handleToUpload(ev) {
      console.log(ev.target.files[0]);
      var file = ev.target.files[0];
      var param = new FormData();
      param.append("file", file, file.name);
      var config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.axios.post("/api2/users/uploadUserHead", param, config).then(res => {
        var status = res.data.status;
        if (status === 0) {
          console.log("头像上传成功");
          this.$store.commit("USER_NAME", {
            name: this.$store.state.user.name,
            isAdmin: this.$store.state.user.isAdmin,
            userHead: res.data.data.userHead + '?' +Math.random() // 加随机数的去除缓存的原理
          });
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    axios.get("/api2/users/getUser").then(res => {
      var status = res.data.status;
      console.log(res.data);
      if (status === 0) {
        next(vm => {
          localStorage.setItem("name", res.data.data.username);
          localStorage.setItem("isAdmin", res.data.data.isAdmin);
          vm.$store.commit("USER_NAME", {
            name: res.data.data.username,
            isAdmin: res.data.data.isAdmin,
            userHead: res.data.data.userHead
          });
        });
      } else {
        next("/mine/login"); // 可以接收地址
      }
    });
  }
};
</script>

<style scoped>
</style>