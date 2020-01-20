<template>

<div>
  <strong>首页 --------------啊啊</strong>

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
