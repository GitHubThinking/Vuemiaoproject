<template>
  <el-card>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="userHead" label="用户头像">
          <template slot-scope="scope">
              <img :src="scope.row.userHead" style="width:50px;height:50px;border-radius:50%;">
          </template>
      </el-table-column>
      <el-table-column prop="date" label="日期">
      </el-table-column>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="email" label="邮编">
      </el-table-column>
      <el-table-column prop="isAdmin" label="用户等级">
      </el-table-column>
      <el-table-column prop="isFreeze" label="用户状态">
        <template slot-scope="scope">
          {{scope.row.isFreeze? '已冻结':'正常'}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleToFreeze(scope.$index,scope.row)" :type="(scope.row.isFreeze ? 'success' :'primary')" size="small">{{ scope.row.isFreeze ? '激活':'冻结' }}</el-button>
          <el-button @click="handleToDelete(scope.$index,scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页做法待定，待我去看例子再决定 -->
    <el-pagination background layout="prev, pager, next" :total="tableData.length" :page-size="3" :current-page.sync="currentPage">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      tableData: [],
      currentPage:1
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    handleToFreeze(index, row) {
      this.axios
        .post("/api2/admin/updateFreeze", {
          email: row.email,
          isFreeze: !row.isFreeze // 同时处理冻结和激活
        })
        .then(res => {
          var status = res.data.status;
          console.log(res);
          if (status === 0) {
            row.isFreeze = !row.isFreeze;
            this.$message({
              message: "恭喜你，操作成功消息",
              type: "success"
            });
          } else {
            this.$message({
              message: "操作失败",
              type: "error"
            });
          }
        });
    },
    handleToDelete(index, row) {
      this.axios
        .post("/api2/admin/deleteUser", {
          email: row.email
        })
        .then(res => {
          var status = res.data.status;
          if (status === 0) {
            this.getTableList();
            this.$message({
              message: "恭喜你，删除成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "删除失败",
              type: "error"
            });
          }
        });
    },
    getTableList() {
      this.axios.get("/api2/admin/userList").then(res => {
        var status = res.data.status;
        console.log(res);
        if (status === 0) {
          this.tableData = res.data.data.userList;
          console.log(this.tableData);
        }
      });
    }
  }
};
</script>

<style scoped>
</style>