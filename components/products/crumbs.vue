<template>
  <div class="m-crumbs">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">{{ this.$store.state.geo.position.city }}美团</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">{{ this.$store.state.geo.position.city }}{{ decodeURIComponent(keyword) }}</a></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  mounted () {
    console.log(this.$store.dispatch('geo/nuxtServerInit'));
    console.log(this.$store.state.geo.position.city);
  },
}
</script>
