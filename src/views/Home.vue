<template>

<div>
 <button @click="getInfo" :style="{ background: bgColor }">请求数据</button>
</div>

</template>
<script>
// @ is an alias to /src
import { getUserInfo } from '@/api/user'
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      url: '',
      bgColor: ''
    }
  },
  methods: {
    getInfo () {
      getUserInfo().then(res => {
        console.log(res)
      })
    }

  }
}
</script>
