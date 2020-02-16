<template>
  <div>
     <i-select v-model="model"  :multiple=multiple :style="{width:width+ 'px'}">
      <i-option v-for="item in Selectlist" :value="item.value" :key="item.value" style="display: none;"  >
      {{ item.title }}
    </i-option>
        <Tree
        show-checkbox
        :data="treeData"
        :check-strictly="checkstrictly"
        @on-check-change="handleCheckChange"
        @on-select-change="handleselectChange"
        ></Tree>
      </i-select>
  </div>
</template>
<script >
export default ({
  name: 'treeSelect',
  data () {
    return {
      model: [],
      Selectlist: [],
      Treelist: []
    }
  },
  props: {
    width: {
      type: Number,
      default: 200
    },
    multiple: {
      tryp: Boolean,
      default: true
    },
    checkstrictly: {
      tryp: Boolean,
      default: true
    }
  },
  methods: {
    handleCheckChange  (data) {
      const value = []
      this.Selectlist = []
      this.model = ''
      data.forEach((item, index) => {
        var temp = {
          value: item.id,
          title: item.title
        }
        this.Selectlist.push(temp)
        value.push(item.id)
      })
      this.model = value
    },
    handleselectChange (data) {
      console.log('handleselectChange')
      console.log(data)
    }
  }
})
</script>
<style scoped lang="scss">

</style>
