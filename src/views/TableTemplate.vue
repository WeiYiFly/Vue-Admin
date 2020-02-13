<template>
  <div class="view-content">
      <template>
        <Form ref="formInline" :model="Queryform"  inline >
            <Row type="flex" class="code-row-bg">
              <i-col :xs="24" :sm="24" :md="8" :lg="8">
                 <FormItem style="width: 90%">
                   <i-input v-model="Queryform.name" placeholder="Enter something...">
                      <label slot="prepend">模块名称</label>
                   </i-input>
                </FormItem>
              </i-col>
              <i-col :xs="24" :sm="24" :md="8" :lg="8">
                <FormItem style="width: 90%">
                   <i-input v-model="Queryform.input" placeholder="Enter something...">
                      <label slot="prepend">模块名称</label>
                   </i-input>
                </FormItem>
              </i-col>
              <template v-if="QueryformIsOpen">
                <i-col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem style="width: 90%">
                    <i-input v-model="Queryform.input" placeholder="Enter something...">
                        <label slot="prepend">模块名称</label>
                    </i-input>
                  </FormItem>
                </i-col>
                <i-col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem style="width: 90%">
                    <i-input v-model="Queryform.input" placeholder="Enter something...">
                        <label slot="prepend">模块名称</label>
                    </i-input>
                  </FormItem>
                </i-col>
                <i-col :xs="24" :sm="24" :md="8" :lg="8">
                  <FormItem style="width: 90%">
                    <i-input v-model="Queryform.input" placeholder="Enter something...">
                        <label slot="prepend">模块名称</label>
                    </i-input>
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
            <button type="button" @click="handleOpenAddModel" class="ivu-btn ivu-btn-primary">
              <icon type="ivu-icon ivu-icon-md-add"></icon> <span>新建</span>
            </button>
         </Card>
        </Row>
        <Table border ref="table" :columns="datacolumns" :data="datalist" :height=tableHeight ></Table>
      </div>
    </template>

    <template>
       <Modal
         v-model="AddmodalIsOpen"
         :loading="AddModalloading"
        title="添加数据"
        @on-ok="handleAddData"
        >
          <template>
              <Form :model="formItem" :label-width="80">
                  <FormItem label="Name">
                      <i-input v-model="formItem.name" placeholder="Enter something..."></i-input>
                  </FormItem>
                  <FormItem label="RouterName">
                      <i-input v-model="formItem.routerName" placeholder="Enter something..."></i-input>
                  </FormItem>
                  <FormItem label="Icon">
                      <i-input v-model="formItem.icon" placeholder="Enter something..."></i-input>
                  </FormItem>
                  <FormItem label="ParentId">
                      <i-input v-model="formItem.parentId" placeholder="Enter something..."></i-input>
                  </FormItem>

                  <FormItem label="Type">
                      <RadioGroup v-model="formItem.type">
                          <Radio :label=1>Model</Radio>
                          <Radio :label=2>Page</Radio>
                      </RadioGroup>
                  </FormItem>
                  <FormItem label="Remarks">
                      <i-input v-model="formItem.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></i-input>
                  </FormItem>
              </Form>
          </template>
        </Modal>
    </template>
  </div>

</template>
<script>
export default {
  data () {
    return {
      QueryformIsOpen: false,
      AddmodalIsOpen: false,
      AddModalloading: true,
      tableHeight: 500,
      BeingEdit: 0,
      formItem: {
        id: '',
        name: '',
        routerKey: '',
        icon: '',
        type: 0,
        parentId: '',
        remarks: ''
      },
      Queryform: {
        user: '',
        password: '',
        name: ''
      },
      datacolumns: [
        {
          title: 'Name',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.name)
            ])
          }
        },
        {
          title: '路由name',
          key: 'routerName'
        },
        {
          title: 'Icon',
          key: 'icon',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: params.row.icon
                }
              })
            ])
          }
        },
        {
          title: 'Type',
          key: 'type',
          render: (h, params) => {
            let temp = ''
            if (params.row.type === 1) {
              temp = 'Modular'
            }
            if (params.row.type === 2) {
              temp = 'Page'
            }
            return h('div', temp)
          }
        },
        {
          title: '功能描述',
          key: 'remarks'
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.eidt(params.index)
                  }
                }
              }, 'Eidt'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, 'Delete')
            ])
          }
        }
      ],
      datalist: [
        {
          id: 1,
          name: 'John Brown',
          age: 18,
          icon: 'md-barcode',
          address: 'New York No. 1 Lake Park'
        },
        {
          id: 2,
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park'
        },
        {
          id: 3,
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park'
        },
        {
          id: 4,
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park'
        }
      ]
    }
  },
  mounted () {
    console.log(this.tableHeight)
    // 表格高度 自适应
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 80
    window.onresize = () => {
      return (() => {
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 150
      })()
    }
  },
  methods: {
    eidt (index) {
      this.formItem = this.datalist[index]
      console.log(this.formItem)
      this.BeingEdit = this.datalist[index].id
      this.AddmodalIsOpen = true
    },
    remove (index) {
      // 删除数据
      this.datalist.splice(index, 1)
    },
    OpenQueryform () {
      // console.log(this.QueryformIsOpen)
      this.QueryformIsOpen = !this.QueryformIsOpen
    },
    handleSubmit () {
      console.log('提交 查询')
      console.log(this.Queryform)
    },
    handleReSet () {
      console.log('重置 查询')
      this.Queryform = {}
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
    handleOpenAddModel () {
      console.log('打开--添加数据 模态框')
      this.formItem = {}
      this.AddmodalIsOpen = true
    },
    handleAddData () {
      console.log(this.formItem.name)
      // 验证
      if (this.formItem.name === '' || this.formItem.name === undefined) {
        this.messageWarningFn('请输入名称')
        return
      }

      if (this.BeingEdit === 0) {
        console.log(this.BeingEdit)
        console.log('添加数据 --提交')
        console.log(this.formItem)
        this.formItem.id = this.datalist.length + 1
        this.datalist.push(this.formItem)
      } else {
        console.log('编辑 --提交')
        var tt = this.datalist.findIndex(item => item.id === this.BeingEdit)
        console.log(this.formItem)
        this.datalist[tt] = this.formItem
      }
      this.BeingEdit = 0
      this.AddmodalIsOpen = false
    }
  }
}
</script>
<style lang="scss">

</style>
