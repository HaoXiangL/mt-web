<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select v-model="province_select" placeholder="省份">
      <el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-select v-model="city_select" :disabled="!city.length" placeholder="城市">
      <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      province: [],
      province_select: "",
      city: [],
      city_select: "",
      input: '',
      cities:[] //全国城市列表
    };
  },
  watch: {
    province_select:async function (newVal) {
      try {
        let {status,data:{city}} = await this.$axios.get(`/geo/province/${newVal}`)
        if (status === 200) {
          this.city = city.map(item =>{
            return {
              value: item.id,
              label: item.name
            }
          })
          this.city_select = ''
        }
      } catch (error) {
        this.$message.error(`获取城市列表失败,错误代码：${error}`);
      }
    }
  },
  async mounted(){
    try {
      let {status,data:{province}} = await this.$axios.get('/geo/province')
    if (status === 200) {
      this.province = province.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
    } catch (error) {
      this.$message.error(`省份初始化失败,错误代码：${error}`);
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function (query,cb) {
      if(this.cities.length){
        cb(this.cities.filter(item => item.value.indexOf(query)>-1))
      }else {
        try {
          let {status,data:{city}} = await this.$axios.get('/geo/city')
        if (status === 200) {
          this.cities = city.map(item => {
            return {
              value: item.name
            }
          })
          cb(this.cities.filter(item => item.value.indexOf(query)>-1))
        }else{
          cb([])
        }
        } catch (error) {
          this.$message.error(`城市搜索失败,错误代码：${error}`);
        }
      }
    },200),
    handleSelect :function () {
      
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/changecity/iselect.scss"
</style>
