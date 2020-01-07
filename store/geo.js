import axios from 'axios'

export const state = () => ({
  position: {
    city: '',
    province: ''
  }
})

export const mutations = {
  setPosition(state, val) {
    state.position = val
  }
}

export const actions = {
  setPosition: ({
    commit
  }, position) => {
    commit('setPosition', position)
  },

  async nuxtServerInit(context) {
    console.log(`store nuxtServerInit`);
    try {
      const {
        status,
        data: {
          province,
          city
        }
      } = await axios.get('/geo/getPosition')
      context.commit('setPosition',status===200?{city,province}:{city:'',province:''})
    } catch (error) {
      this.$message.error(`获取vuex省份失败,错误码为：${error}`);
    }
    
  }
}


