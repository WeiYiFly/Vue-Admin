<template>
  <div class="view-content">
      <template>
        <Form ref="formInline" :model="Queryform"  inline >
            <Row type="flex" class="code-row-bg">
              <i-col :xs="24" :sm="24" :md="8" :lg="8">
                 <FormItem style="width: 90%">
                   <i-input v-model="Queryform.Name" placeholder="Enter something...">
                      <label slot="prepend">模块名称</label>
                   </i-input>
                </FormItem>
              </i-col>
              <i-col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem style="width: 90%">
                   <i-input v-model="Queryform.RouterName" placeholder="Enter something...">
                      <label slot="prepend">路由名称</label>
                   </i-input>
                </FormItem>
              </i-col>
              <template v-if="QueryformIsOpen">
                <i-col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem style="width: 90%">
                    <i-input v-model="Queryform.Name" placeholder="Enter something...">
                        <label slot="prepend">模块名称</label>
                    </i-input>
                  </FormItem>
                </i-col>
                <i-col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem style="width: 90%">
                    <i-input v-model="Queryform.Name" placeholder="Enter something...">
                        <label slot="prepend">模块名称</label>
                    </i-input>
                  </FormItem>
                </i-col>
                <i-col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem style="width: 90%" label="是否启用">
                     <i-switch v-model="Queryform.Status"  />
                  </FormItem>
                </i-col>
              </template>
              <i-col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem style="width: 90%">
                 <Button type="primary" @click="handleSubmit('QueryformInline')">查询</Button>
                 <Button style="margin-left: 8px" @click="handleReSet">重置</Button>
                  <a v-if="!QueryformIsOpen"  style="font-size: 14px;" @click="OpenQueryform">
                      展开<Icon type="ios-arrow-down" />
                  </a>
                  <a v-else style="font-size: 14px;" @click="OpenQueryform">
                      收起<Icon type="ios-arrow-up" />
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
              <icon type="ivu-icon ivu-icon-md-add"></icon> <span>新增</span>
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
                  <FormItem label="Name">
                      <i-input v-model="formItem.Name" placeholder="Enter something..."></i-input>
                  </FormItem>
                  <FormItem label="RouterName">
                      <i-input v-model="formItem.RouterName" placeholder="Enter something..."></i-input>
                  </FormItem>
                  <FormItem label="IconName">
                      <i-input v-model="formItem.IconName" placeholder="Enter something..."></i-input>
                  </FormItem>
                  <FormItem label="ParentId">
                      <i-input v-model="formItem.ParentId" placeholder="Enter something..."></i-input>
                  </FormItem>
                  <FormItem  label="是否启用">
                     <i-switch v-model="formItem.Status">  </i-switch>
                  </FormItem>

                  <FormItem label="Type">
                      <RadioGroup v-model="formItem.Type">
                          <Radio :label=1>Model</Radio>
                          <Radio :label=2>Page</Radio>
                      </RadioGroup>
                  </FormItem>
                  <FormItem label="Remarks">
                      <i-input v-model="formItem.Remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></i-input>
                  </FormItem>
              </Form>
          </template>
        </Modal>
    </template>
  </div>

</template>
<script>
import { GetModuleList, AddModule, EditModule, DeleteModule } from '@/api/system'
// , EditModule, DeleteModule
export default {
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
      BeingAddorEdit: '正在添加数据',
      Rules: {
        Add: true,
        Edit: true,
        Delete: true
      },
      formItem: {
        id: '',
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
          title: 'Name',
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
          title: '路由name',
          key: 'RouterName'
        },
        {
          title: 'Icon',
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
          title: 'Type',
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
          title: '是否启用',
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
          title: '功能描述',
          key: 'Remarks'
        },
        {
          title: 'Action',
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
            }, 'Eidt')
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
                title: '您确认删除这条内容吗？'
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
              }, 'Delete')
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
      this.BeingAddorEdit = '正在添加数据'
      this.formItem = { Status: true, Type: 1 }
      this.AddmodalIsOpen = true
    },
    Eidt (index) {
      this.BeingAddorEdit = '正在编辑数据'
      this.formItem = this.datalist[index]
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
      console.log('重置 查询')
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
        this.messageWarningFn('请输入名称')
        return
      }
      if (this.BeingAddorEdit === '正在添加数据') {
        console.log('添加数据 --提交')
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
        console.log('编辑数据 --提交')
        console.log(this.datalist)
        console.log(this.formItem)
        var tt = this.datalist.findIndex(item => item.id === this.formItem.id)
        EditModule(this.formItem).then(res => {
          this.$Message.success({
            background: true,
            content: res.Message
          })
        })
        this.datalist[tt] = this.formItem
      }
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
    }
  },
  created () {
    this.getShowData()
    // GetModuleList({
    //   tablePage,
    //   tablelimit
    // }).then(res => {
    //   console.log(res)
    //   this.datalist = res
    // })
  }
}
</script>
<style lang="scss">

</style>
