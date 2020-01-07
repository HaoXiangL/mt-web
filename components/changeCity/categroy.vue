<template>
  <div>
    <div class="">
      <dl class="m-categroy">
        <dt>按拼音首字母选择:</dt>
        <dd v-for="(item, index) in list" :key="item">
          <a :href="'#city-'+item">{{item}}</a>
        </dd>
      </dl>
      <dl v-for="item in block" :key="item.title" class="m-categroy-section">
        <dt :id="'city-'+item.title">{{ item.title }}</dt>
        <dd>
          <span v-for="(c, index) in item.city" :key="c">{{c}}</span>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import pyjs from 'js-pinyin';
  export default {
    data() {
      return {
        list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        block:[]
      }
    },
    async mounted () {
      let blocks = []
      let { status, data:{city}} = await this.$axios.get('/geo/city')
      if (status === 200) {
        let p
        let c
        let d = {}
        city.forEach(item =>{
          //使用js-拼音库取得首字母拼音小写
          p = pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1)
          c = p.charCodeAt(0)
          //区分大小写
          if (c > 96 && c < 123) {
            if (!d[p]) {
              d[p] = []
            }
            d[p].push(item.name)
          }
        })
        //Object.entries返回一个数组
        for (const [k,v] of Object.entries(d)) {
          blocks.push({
            title: k.toUpperCase(),
            city: v
          })
        }
        //排序
        blocks.sort((a,b)=> a.title.charCodeAt(0) - b.title.charCodeAt(0))
        this.block = blocks
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/changecity/categroy.scss"
</style>