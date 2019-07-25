<template>
  <div>
    <Header title="我的喵喵"></Header>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";

export default {
  name: "Mine",
  components: { Header, TabBar },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>