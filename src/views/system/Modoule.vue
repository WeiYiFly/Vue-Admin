<template>
  <div class="view-content">
     <!-- 查询 表单 -->
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
   <!-- 数据tabale -->
    <template>
      <div class="view-content-body">
        <Row >
          <Card :padding="2" :bordered="false">
             <Button  v-if="Rules.Add" @click="Add"   type="primary" icon="md-add" style="margin-left:10px">{{$t('action.NewAdd')}}</Button>
             <Button  v-if="Rules.AddElement" @click="AddElement"  type="info" icon="md-add" style="margin-left:10px">{{$t('添加元素')}}</Button>
             <Button  v-if="Rules.EditElement" @click="EditElement"  type="warning" icon="md-create" style="margin-left:10px">{{$t('编辑元素')}}</Button>
              <Button v-if="Rules.DeleteElement" @click="DeleteElement"  type="error" icon="md-remove" style="margin-left:10px">{{$t('删除元素')}}</Button>
         </Card>
        </Row>
        <Row>
          <i-col :xs="22" :sm="20" :md="18" :lg="16">
            <Table
                  row-key="Id"
                  highlight-row
                  :loading="tableLoading"
                  border
                  ref="table"
                  :columns="datacolumns"
                  :data="dataTreeListV"
                  :height=tableHeight
                  @on-current-change="handleModelTableRowCilck" >
            </Table>
            <Page :total=tableTotal show-elevator show-sizer  show-total
            :page-size-opts="[10, 20, 30, 50 ,100]"
            @on-change="handleTablePageChange"
            @on-page-size-change="handleTablePageSzieChange"
              />
          </i-col>

        <i-col :xs="2" :sm="4" :md="6" :lg="8">
        <Table border ref="DataTableElement"
        :columns="DataTableElement.col"
        :data="DataTableElement.List"
         ></Table>
        </i-col>

      </Row>
     </div>
    </template>
  <!-- 新增，模态框 -->
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
        <!-- 新增元素菜单权限按钮 模态框-->
     <Modal
         v-model="ModalFrameElement.IsOpen"
         :loading="ModalFrameElement.Isloading"
        :title="ModalFrameElement.title"
        @on-ok="handleModalFrameElementSubmit"
        >
        <form-group ref="ModalFrameElement" :list="ModalFrameElement.ElementFormList"></form-group>
        </Modal>
    </template>
    <!-- <template>
    <InputNumber  v-model="value1"></InputNumber>
</template> -->
  </div>

</template>
<script>
import {
  GetModuleList, AddModule, EditModule, DeleteModule, GetModuleTree,
  AddModuleElement, GetModuleElementList, EditModuleElement, DeleteModuleElementBatch
} from '@/api/system'
import FormGroup from '@/components/form-group'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { ListToTree } from '@/lib/util'
import { Msgsuccess, Msgerror } from '@/lib/message'
export default {
  components: {
    Treeselect,
    FormGroup

  },
  computed: {
    dataTreeListV () {
      // this.dataTreeList = []
      var data = JSON.parse(JSON.stringify(this.datalist)) // 深拷贝
      var rdata = ListToTree({
        arrayList: data,
        pidStr: 'ParentId',
        idStr: 'Id',
        childrenStr: 'children'
      })
      return rdata
    }
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
      tablelimit: 100,
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
        Delete: true,
        AddElement: true,
        EditElement: true,
        DeleteElement: true
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
          tree: true,
          render: (h, params) => {
            return h('div', {
              style: {
                float: 'left'
              }
            }, [
              h('Icon', {
                props: {
                  type: params.row.children ? 'md-folder' : 'md-browsers',
                  size: 20
                },
                style: {
                  // width: '20px'
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
                  // console.log(params)
                  this.Eidt(params.row.Id)
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
                  this.Delete(params.row.Id)
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
      ],
      dataTreeList: [
      ],
      ModalFrameElement: { // 菜单模态框
        IsOpen: false,
        Isloading: true,
        title: '',
        ElementFormList: [
          {
            Name: 'Name',
            type: 'i-input',
            value: '',
            label: '名称'
          },
          {
            Name: 'RulesName',
            type: 'i-input',
            value: '',
            label: '权限标识'
          },
          {
            Name: 'Class',
            type: 'i-input',
            value: '',
            label: '样式'
          },
          {
            Name: 'Icon',
            type: 'i-input',
            value: '',
            label: '图标'
          },
          {
            Name: 'Sort',
            type: 'InputNumber',
            value: 1,
            label: '排序'
          },
          {
            Name: 'Remark',
            type: 'i-input',
            value: '',
            label: '备注'
          },
          {
            Name: 'Status',
            type: 'i-switch',
            value: true,
            label: '状态是否启用'
          }
        ],
        ModuleId: '' // 模块Id
      },
      DataTableElement: { // 菜单表格
        col: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: this.$t('tabC.Name'),
            key: 'Name'
          },
          {
            title: this.$t('tabC.RulesName'),
            key: 'RulesName'
          },
          {
            title: this.$t('tabC.Icon'),
            key: 'Icon'
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
          }
        ],
        List: []
      }
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
    AddElement () {
      if (this.ModalFrameElement.ModuleId === '') {
        Msgerror('请选择模块')
        return false
      }
      this.ModalFrameElement.title = this.$t('msg.BeingAddDate')
      this.ModalFrameElement.IsOpen = true
      this.$refs.ModalFrameElement.handleReset() // 重置表单
    },
    Eidt (Id) {
      this.BeingAddorEdit = this.$t('msg.BeingEditDate')
      this.formItem = this.datalist.find(u => u.Id === Id)
      // console.log(this.formItem)
      this.AddmodalIsOpen = true
    },
    EditElement () {
      // this.$refs.DataTableElement
      var temp = this.$refs.DataTableElement.getSelection()
      if (temp.length !== 1) {
        Msgerror('请选择一条数据')
        return
      }
      this.$refs.ModalFrameElement.valueList = this.DataTableElement.List.find(u => u.Id === temp[0].Id) // 表单赋值
      this.ModalFrameElement.title = this.$t('msg.BeingEditDate')
      this.ModalFrameElement.IsOpen = true
    },
    Delete (Id) {
      DeleteModule({ Id }).then(res => {
        if (res.Code === 200) {
          var index = this.datalist.findIndex(u => u.Id === Id)
          this.datalist.splice(index, 1)
          Msgsuccess(res.Code)
        } else {
          Msgerror(res.Code)
        }
      })
    },
    DeleteElement () {
      var temp = this.$refs.DataTableElement.getSelection()
      console.log(temp)
      if (temp.length < 1) {
        Msgerror('请选择数据')
        return
      }
      var key = ''
      temp.forEach(element => {
        key += element.Id + ','
      })
      DeleteModuleElementBatch({ key }).then(res => {
        if (res.Code === 200) {
          Msgsuccess(res.Code)
        } else {
          Msgerror(res.Code)
        }
      })
      temp.forEach(e => {
        var index = this.DataTableElement.List.findIndex(u => u.Id === e.Id)
        if (index > -1) { this.DataTableElement.List.splice(index, 1) }
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
    handleTablePageSzieChange (index) { // 改变 表格页数显示数量
      this.tablePage = 1
      this.tablelimit = index
      this.getShowData()
    },
    handleSubmit () { // 提交 查询
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
      // console.log(this.formItem.name)
      // 验证
      if (this.formItem.Name === '' || this.formItem.Name === undefined) {
        this.messageWarningFn(this.$t('msg.InputName'))
        return
      }
      if (this.BeingAddorEdit === this.$t('msg.BeingAddDate')) {
        // console.log('添加数据 --提交')
        AddModule(this.formItem).then(res => {
          this.formItem.Id = res.Result
          this.datalist.push(this.formItem)
          Msgsuccess(res.Code)
        })
      } else {
        // console.log('编辑数据 --提交')
        var tt = this.datalist.findIndex(item => item.Id === this.formItem.Id)
        EditModule(this.formItem).then(res => {
          Msgsuccess(res.Code)
        })
        this.datalist[tt] = this.formItem
      }
      this.AddmodalIsOpen = false
    },
    getShowData () { // 获取 模块 数据
      this.tableLoading = true
      const Querydata = { ...this.Queryform, page: this.tablePage, limit: this.tablelimit }
      GetModuleList(Querydata).then(res => {
        if (res.Code === 200) {
          this.datalist = res.Data
          this.tableTotal = res.Count
        } else {
          Msgerror(res.Code)
        }
        this.tableLoading = false
      })
    },
    getElementData () { // 获取元素数据
      const Querydata = { key: this.ModalFrameElement.ModuleId }
      GetModuleElementList(Querydata).then(res => {
        if (res.Code === 200) {
          this.DataTableElement.List = res.Data
        } else {
          Msgerror(res.Code)
        }
      })
    },
    getModuleTree () {
      GetModuleTree().then(res => {
        this.treeselectData = JSON.parse(res.Result)
      })
    },
    handleModelTableRowCilck (currentRow, oldCurrentRow) { // 处理表格行点击事件
      this.ModalFrameElement.ModuleId = currentRow.Id
      this.getElementData()
    },
    handleModalFrameElementSubmit () { // 处理--元素菜单模态框---提交事件
      var fromValuelist = this.$refs.ModalFrameElement.valueList
      if (this.ModalFrameElement.title === this.$t('msg.BeingAddDate')) { // 添加
        fromValuelist.ModuleId = this.ModalFrameElement.ModuleId
        AddModuleElement(fromValuelist).then(res => {
          Msgsuccess(res.Code)
          fromValuelist.Id = res.Result
          this.DataTableElement.List.push(fromValuelist)
        })
      } else { // 编辑
        EditModuleElement(fromValuelist).then(res => {
          // this.DataTableElement.List[index] = fromValuelist //不需要重新复制 编辑的时候讲对象给他了
          Msgsuccess(res.Code)
        })
      }
      this.ModalFrameElement.IsOpen = false
    }
  },
  created () {
    this.getShowData()
    this.getModuleTree()
  }
}
</script>
<style lang="scss">
.ivu-table-cell-tree {
  float:left;
}
.ivu-table-cell-tree-level{
  float:left;
}
</style>
