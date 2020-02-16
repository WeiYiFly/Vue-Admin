<template>
  <div class="view-content">
      <template>
        <Form ref="formInline" :model="Queryform"  inline >
            <Row type="flex" class="code-row-bg">
              <i-col :xs="24" :sm="24" :md="8" :lg="8">
                 <FormItem style="width: 90%">
                   <i-input v-model="Queryform.Name" placeholder="Enter something...">
                      <label slot="prepend">{{$t('tabC.Name')}}</label>
                   </i-input>
                </FormItem>
              </i-col>
              <i-col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem style="width: 90%">
                   <i-input v-model="Queryform.RouterName" placeholder="Enter something...">
                      <label slot="prepend">{{$t('tabC.RouterName')}}</label>
                   </i-input>
                </FormItem>
              </i-col>
              <template v-if="QueryformIsOpen">
                <i-col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem style="width: 90%">
                    <i-input v-model="Queryform.Name" placeholder="Enter something...">
                        <label slot="prepend">{{$t('tabC.Name')}}</label>
                    </i-input>
                  </FormItem>
                </i-col>
                <i-col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem style="width: 90%">
                    <i-input v-model="Queryform.Name" placeholder="Enter something...">
                        <label slot="prepend">{{$t('tabC.Name')}}</label>
                    </i-input>
                  </FormItem>
                </i-col>
                <i-col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem style="width: 90%" :label='this.$t("tabC.Status")'>
                     <i-switch v-model="Queryform.Status"  />
                  </FormItem>
                </i-col>
              </template>
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
    <template>
      <div class="view-content-body">
        <Row >
          <Card>
            <button v-if="Rules.Add" type="button" @click="Add" class="ivu-btn ivu-btn-primary" >
              <icon type="ivu-icon ivu-icon-md-add"></icon> <span>{{$t('action.NewAdd')}}</span>
            </button>
         </Card>
        </Row>
        <Table :loading="tableLoading" border ref="table" :columns="datacolumns" :data="datalist" :height=tableHeight ></Table>
         <Page :total=tableTotal show-elevator show-sizer  show-total
         :page-size-opts="[10, 20, 30, 50 ,100]"
         @on-change="handleTablePageChange"
         @on-page-size-change="handleTablePageSzieChange"
           />
      </div>
    </template>

    <template>
       <Modal
         v-model="AddmodalIsOpen"
         :loading="AddModalloading"
        :title="BeingAddorEdit"
        @on-ok="handleAddorEditData"
        >
          <template>
              <Form :model="formItem" :label-width="80">
                  <FormItem :label='this.$t("tabC.Name")' >
                      <i-input v-model="formItem.Name" placeholder="Enter something..."></i-input>
                  </FormItem>
                  <FormItem :label='this.$t("tabC.RouterName")' >
                      <i-input v-model="formItem.RouterName" placeholder="Enter something..."></i-input>
                  </FormItem>
                  <FormItem :label='this.$t("tabC.IconName")'>
                      <i-input v-model="formItem.IconName" placeholder="Enter something..."></i-input>
                  </FormItem>
                  <FormItem :label='this.$t("tabC.ParentId")'>
                      <!-- <i-input v-model="formItem.ParentId" placeholder="Enter something..."></i-input> -->
                      <Row>
                        <i-col :xs="20" :sm="20" :md="20" :lg="20">
                          <treeselect v-model="formItem.ParentId"  :multiple="false"  :options="treeselectData"  />
                        </i-col>
                        <i-col :xs="4" :sm="4" :md="4" :lg="4">
                           <Button size="large" icon="md-refresh" type="primary" shape="circle" @click="getModuleTree"></Button>
                         </i-col>
                      </Row>

                  </FormItem>
                  <FormItem  :label='this.$t("tabC.Status")'>
                     <i-switch v-model="formItem.Status">  </i-switch>
                  </FormItem>

                  <FormItem :label='this.$t("tabC.Type")'>
                      <RadioGroup v-model="formItem.Type">
                          <Radio :label=1>Model</Radio>
                          <Radio :label=2>Page</Radio>
                      </RadioGroup>
                  </FormItem>
                  <FormItem :label='this.$t("tabC.Remarks")'>
                      <i-input v-model="formItem.Remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></i-input>
                  </FormItem>
              </Form>
          </template>
        </Modal>
    </template>
  </div>

</template>
<script>
import { GetModuleList, AddModule, EditModule, DeleteModule, GetModuleTree } from '@/api/system'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: {
    Treeselect
  },
  data () {
    return {
      QueryformIsOpen: false,
      AddmodalIsOpen: false,
      AddModalloading: true,
      tableLoading: false,
      tableHeight: 500,
      tableTotal: 0,
      tablePage: 1,
      tablelimit: 10,
      treeselectData: [{
        id: 'a',
        label: 'a',
        children: [{
          id: 'aa',
          label: 'aa'
        }, {
          id: 'ab',
          label: 'ab'
        }, {
          id: 'ac',
          label: 'ac'
        }]
      }, {
        id: 'b',
        label: 'b'
      }, {
        id: 'c',
        label: 'c'
      }],
      BeingAddorEdit: this.$t('msg.BeingAddDate'),
      Rules: {
        Add: true,
        Edit: true,
        Delete: true
      },
      formItem: {
        Id: '',
        Name: '',
        RouterName: '',
        Status: true,
        IconName: '',
        type: 0,
        SortNo: 0,
        ParentId: '',
        Remarks: ''
      },
      Queryform: {
        Name: '',
        RouterName: '',
        Status: true
      },
      datacolumns: [
        {
          title: this.$t('tabC.Name'),
          key: 'Name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.Name)
            ])
          }
        },
        {
          title: this.$t('tabC.RouterName'),
          key: 'RouterName'
        },
        {
          title: this.$t('tabC.IconName'),
          key: 'IconName',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: params.row.IconName
                }
              })
            ])
          }
        },
        {
          title: this.$t('tabC.Type'),
          key: 'Type',
          render: (h, params) => {
            let temp = ''
            if (params.row.Type === 1) {
              temp = 'Modular'
            }
            if (params.row.Type === 2) {
              temp = 'Page'
            }
            return h('div', temp)
          }
        },
        {
          title: this.$t('tabC.Status'),
          key: 'Status',
          render: (h, params) => {
            // const temp = '<Switch v-model=' + params.row.Status + '  />'
            return h('div', [
              h('i-switch', {
                props: {
                  type: 'primary',
                  value: params.row.Status,
                  disabled: true
                }
              })
            ])
          }
        },
        {
          title: this.$t('tabC.Remarks'),
          key: 'Remarks'
        },
        {
          title: this.$t('tabC.Action'),
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            // 添加按钮
            var EditButton = h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.Eidt(params.index)
                }
              }
            }, this.$t('action.Edit'))
            // 删除按钮
            // var DeleteButton = h('Button', {
            //   props: {
            //     type: 'error',
            //     size: 'small'
            //   },
            //   on: {
            //     click: () => {
            //       this.Delete(params.index)
            //     }
            //   }
            // }, 'Delete')
            var DeleteButton = h('Poptip', {
              props: {
                confirm: true,
                transfer: true,
                title: this.$t('msg.confirmDel')
              },
              on: {
                'on-ok': () => {
                  // this.$Message.info('点击了确定')
                  this.Delete(params.index)
                }
              }
            }, [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  // click: () => {
                  //   this.Delete(params.index)
                  // }
                }
              }, this.$t('action.Delete'))
            ])
            var rulesButton = []
            if (this.Rules.Edit) rulesButton = [...rulesButton, EditButton]
            if (this.Rules.Delete) rulesButton = [...rulesButton, DeleteButton]
            return h('div', [
              rulesButton
            ])
          }
        }
      ],
      datalist: [
      ]
    }
  },
  mounted () {
    // console.log(this.tableHeight)
    // 表格高度 自适应
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 130
    window.onresize = () => {
      return (() => {
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 180
      })()
    }
  },
  methods: {
    Add () {
      // console.log('打开--添加数据 模态框')
      this.BeingAddorEdit = this.$t('msg.BeingAddDate')
      this.formItem = { Status: true, Type: 1 }
      this.AddmodalIsOpen = true
    },
    Eidt (index) {
      this.BeingAddorEdit = this.$t('msg.BeingEditDate')
      this.formItem = this.datalist[index]
      console.log(this.formItem)
      this.AddmodalIsOpen = true
    },
    Delete (index) {
      var Id = this.datalist[index].Id
      DeleteModule({ Id }).then(res => {
        this.$Message.success({
          background: true,
          content: res.Message
        })
        this.datalist.splice(index, 1)
      })
    },
    OpenQueryform () {
      // console.log('查询 收缩 状态')
      this.QueryformIsOpen = !this.QueryformIsOpen
    },
    handleTablePageChange (index) {
      // console.log('改变 表格页数')
      this.tablePage = index
      this.getShowData()
    },
    handleTablePageSzieChange (index) {
      // console.log('改变 表格页数显示数量')
      this.tablePage = 1
      this.tablelimit = index
      this.getShowData()
    },
    handleSubmit () {
      // console.log('提交 查询')
      // console.log(this.Queryform)
      this.tablePage = 1
      this.getShowData()
    },
    handleReSet () {
      // console.log('重置 查询')
      this.Queryform = { Status: true }
    },
    messageWarningFn (text) {
      this.$Message.warning(text)
      setTimeout(() => {
        this.AddModalloading = false
        this.$nextTick(() => {
          this.AddModalloading = true
        })
      }, 500)
    },
    handleAddorEditData () {
      console.log(this.formItem.name)
      // 验证
      if (this.formItem.Name === '' || this.formItem.Name === undefined) {
        this.messageWarningFn(this.$t('msg.InputName'))
        return
      }
      if (this.BeingAddorEdit === this.$t('msg.BeingAddDate')) {
        // console.log('添加数据 --提交')
        console.log(this.formItem)
        // this.formItem.id = this.datalist.length + 1
        this.datalist.push(this.formItem)
        AddModule(this.formItem).then(res => {
          this.$Message.success({
            background: true,
            content: res.Message
          })
        })
      } else {
        // console.log('编辑数据 --提交')
        // console.log(this.datalist)
        // console.log(this.formItem)
        var tt = this.datalist.findIndex(item => item.Id === this.formItem.Id)
        EditModule(this.formItem).then(res => {
          this.$Message.success({
            background: true,
            content: res.Message
          })
        })
        this.datalist[tt] = this.formItem
      }
      // this.formItem.id
      this.AddmodalIsOpen = false
    },
    getShowData () {
      this.tableLoading = true
      const Querydata = { ...this.Queryform, page: this.tablePage, limit: this.tablelimit }
      GetModuleList(Querydata).then(res => {
        // console.log(res)
        if (res.Code === 200) {
          this.datalist = res.Data
          this.tableTotal = res.Count
        } else {
          this.$Message.error({
            background: true,
            content: res.Message
          })
        }

        this.tableLoading = false
      })
    },
    getModuleTree () {
      GetModuleTree().then(res => {
        // console.log(res)
        this.treeselectData = res.Result
      })
    }
  },
  created () {
    this.getShowData()
    this.getModuleTree()
  }
}
</script>
<style lang="scss">

</style>
