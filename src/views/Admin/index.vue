<template>
  <el-container>
    <el-header>管理后台，欢迎：{{$store.state.user.name}}</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
          <el-menu-item index="/admin/users">
            <i class="el-icon-menu"></i>
            <router-link to="/admin/users" tag="span" slot="title">用户管理</router-link>
          </el-menu-item>
          <el-menu-item index="/admin/movies">
            <i class="el-icon-menu"></i>
            <router-link to="/admin/movies" tag="span" slot="title">电影管理</router-link>
          </el-menu-item>
          <el-menu-item index="/admin/cinemas">
            <i class="el-icon-document"></i>
            <router-link to="/admin/cinemas" tag="span" slot="title">影院管理</router-link>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {};
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>