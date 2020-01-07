<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市:</dt>
      <dd v-for="item in list" :key="item.id">{{item.name === '市辖区'?item.province : item.name}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  async mounted() {
    try {
      let {
        status,
        data: { hots }
      } = await this.$axios.get("/geo/hotCity");
      if (status === 200) {
        this.list = hots
      }
    } catch (error) {
      this.$message.error(`热门城市请求失败,错误代码为${error}`)
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/css/changecity/hot.scss";
</style>
