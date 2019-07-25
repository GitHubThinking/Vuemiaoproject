<template>
  <div>
    <Header title="喵喵电影"></Header>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";

export default {
  name: "Movie",
  components: { Header, TabBar },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>