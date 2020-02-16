<template>
     <Form ref="formInline" :model="valueList"  inline >
            <Row type="flex" class="code-row-bg ">
              <i-col :xs="24" :sm="24" :md="8" :lg="8"
               v-for="(item,index) in filterList"
              :key="`${_uid}_${index}`"
              class="queryitem"
              >
                <FormItem  label-position="left"   :label="item.Name"   style="width: 90%">
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
              </i-col>
              <i-col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem style="width: 90%">
                 <Button type="primary" @click="handleSubmit('QueryformInline')">{{$t('action.Query')}}</Button>
                 <Button style="margin-left: 8px" @click="handleReSet">{{$t('action.Reset')}}</Button>
                  <a v-if="!QueryformIsOpen"  style="font-size: 14px;" @click="OpenQueryform">
                      {{$t('action.Open')}}<Icon type="ios-arrow-down" />
                  </a>
                  <a v-else style="font-size: 14px;" @click="OpenQueryform">
                      {{$t('action.Retract')}}<Icon type="ios-arrow-up" />
                  </a>
                </FormItem>
              </i-col>
            </Row>
        </Form>
</template>
<script>
import clonedeep from 'clonedeep'
export default {
  name: 'QueryForm',
  props: {
    QueryMethod: {
      type: Function,
      default: null
    },
    list: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      QueryformIsOpen: false,
      valueList: {},
      initValueList: {}
    }
  },
  computed: {
    filterList () {
      if (this.QueryformIsOpen) {
        return this.list
      } else {
        if (this.list.length > 2) { return [this.list[0], this.list[1]] } else { return [this.list[0]] }
      }
    }
  },
  methods: {
    OpenQueryform () {
      this.QueryformIsOpen = !this.QueryformIsOpen
    },
    handleSubmit () {
      this.QueryMethod(this.valueList)
    },
    handleReSet () {
      this.valueList = clonedeep(this.initValueList)
    },
    setInitValue () {
      var valueList = {}
      var initValueList = {}
      this.list.forEach(item => {
        valueList[item.Name] = item.value
        initValueList[item.Name] = item.value
      })
      this.valueList = valueList
      this.initValueList = initValueList
    }
  },
  mounted () {
    this.setInitValue()
  }
}
</script>
<style>
.queryitem .ivu-form-item-content{
  float: left;
  width: 60%;
}
</style>
