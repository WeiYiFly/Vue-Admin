<template>
 <Form ref="form" v-if="Object.keys(valueList).length" :label-width="labelWidth" :model="valueList" :rules="rules">
   <FormItem
      v-for="(item,index) in list"
      :label="item.Name"
      :key="`${_uid}_${index}`"
      :prop="item.Name"
      :error="errorStore[item.name]"
      label-position="left"
      >
    <component :is="item.type" :range="item.range" v-model="valueList[item.Name]">
      <template v-if="item.children">
          <component v-for="(child, i) in item.children.list"
               :is="item.children.type"
               :key="`${_uid}_${index}_${i}`"
               :value="child.value"
               :label="child.label"
               >
               {{child.title}}
          </component>
      </template>
    </component>
   </FormItem>
   <!-- <FormItem>
      <Button @click="handleSubmit" type="primary">提交</Button>
      <Button @click="handleReset">重置</Button>
    </FormItem> -->
 </Form>
</template>
<script>
import clonedeep from 'clonedeep'
export default {
  name: 'FormGroup',
  data () {
    return {
      initValueList: [],
      valueList: {},
      rules: {},
      errorStore: {}
    }
  },
  props: {
    list: {
      type: Array,
      default: () => {}
    },
    labelWidth: {
      type: Number,
      default: 100
    }
  },
  watch: {
    list () {
      this.setInitValue()
    }
  },
  methods: {
    setInitValue () {
      // this.initValueList = this.list.map(item => item.value)
      // console.log(this.initValueList)
      var rules = {}
      var valueList = {}
      var initValueList = {}
      var errorStore = {}
      this.list.forEach(item => {
        rules[item.Name] = item.rule
        valueList[item.Name] = item.value
        initValueList[item.Name] = item.value
        errorStore[item.Name] = ''
      })
      this.rules = rules
      this.valueList = valueList
      this.initValueList = initValueList
      this.errorStore = errorStore
      // console.log(this.rules)
      // console.log(this.valueList)
    },
    handleSubmit () {
      // console.log('我被了调用')
    },
    IsVerification () { // 验证表单
      var Verification = false
      this.$refs.form.validate(valid => {
        if (valid) {
          Verification = true
        } else {
          Verification = false
          this.$Message.error('Fail!')
        }
      })
      return Verification
    },
    handleReset () { // 重置表单
      this.valueList = clonedeep(this.initValueList)
    }
  },
  mounted () {
    this.setInitValue()
  }
}
</script>
<style>

</style>
