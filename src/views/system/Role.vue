<template>
    <div  class="view-content">
   <!-- 查询 表单 -->
      <template>
        <query-form ref="Query" :list=QueryList :QueryMethod="getShowDataTable"></query-form>
     </template>
  <!-- 数据tabale -->
    <template>
      <div class="view-content-body">
        <Row >
          <Card :padding="2" :bordered="false">
            <Button  v-if="Rules.Add" @click="Add"   type="primary" icon="md-add" style="margin-left:10px">{{$t('action.NewAdd')}}</Button>
            <Button  v-if="Rules.AccessModule" @click="AccessModule"   type="primary" icon="ios-search" style="margin-left:10px">{{$t('为角色分配模块')}}</Button>
         </Card>
        </Row>
        <Table
        ref="Roletable"
          highlight-row
          border
          :loading="DataTable.Loading"
          :columns="DataTable.columns"
          :data="DataTable.List"
          :height=DataTable.Height
           @on-current-change="handleTableRowCilck" ></Table>
          <Page :total=DataTable.Total show-elevator show-sizer  show-total
          :page-size-opts="[10, 20, 30, 50 ,100]"
          :page-size=DataTable.limit
          @on-change="handleTablePageChange"
          @on-page-size-change="handleTablePageSzieChange"
           />
      </div>
    </template>
     <!-- 新增，模态框 -->
    <template>
       <Modal
         v-model="ModalFrame.IsOpen"
         :loading="ModalFrame.Isloading"
        :title="ModalFrame.title"
        @on-ok="handleModalFrame"
        >
        <form-group ref="Form" :list="formList"></form-group>
        </Modal>

        <!-- 分配模块模态框 -->
        <Modal
         v-model="ModalAccessModule.IsOpen"
         :loading="ModalAccessModule.Isloading"
        :title="ModalAccessModule.title"
        >
        <p slot="header" style="text-align:center">
            <span>为角色《{{ModalAccessModule.RoleName}}》分配模块</span>
        </p>
        <div style="text-align:left" v-show="ModalAccessModule.NextIndex==0">
            <Tree ref="ModalModuletree" :data="ModalAccessModule.ModuleList" show-checkbox multiple :check-strictly=true></Tree>
        </div>
        <div style="text-align:left" v-show="ModalAccessModule.NextIndex==1">

          <div
          v-for="(item,index) in ModalAccessModule.checkedList"  :key="`Breadcrumb_${_uid}_${index}`">
            <Breadcrumb separator=">" >
                <BreadcrumbItem v-for="(children,i ) in item.name" :key="`Breadcrumb_${_uid}_${index}_${i}`" >{{children}}</BreadcrumbItem>
            </Breadcrumb>
          <CheckboxGroup v-model="ModalAccessModule.checkElement" >
              <Checkbox v-for="(chil,i ) in item.elementList"
              :key="`Checkbox_${_uid}_${index}_${i}`"
              :label="`${chil.Id}`">{{chil.Name}}</Checkbox>
          </CheckboxGroup>
          <br>
        </div>

        </div>
          <div slot="footer">
            <Button v-show="ModalAccessModule.NextIndex === 0" @click="handleModalAccessModuleCancel">取消</Button>
            <Button v-show="ModalAccessModule.NextIndex > 0" @click="handleModalAccessModuleUp"  type="primary">上一步</Button>
            <Button v-show="ModalAccessModule.NextIndex < 1" type="success" @click="handleModalAccessModuleNext">下一步</Button>
             <Button v-show="ModalAccessModule.NextIndex === 1" type="success" @click="handleModalAccessModuleConfirm">确认</Button>
        </div>
        </Modal>
    </template>
    </div>
</template>
<script >
import FormGroup from '@/components/form-group'
import QueryForm from '@/components/query-form'
import { Msgsuccess, Msgerror } from '@/lib/message'
import { AddRole, GetRoleList, DeleteRole, EditRole, GetRoleModuleTree, GetRoleModuleElementList, SetRoleModuleElementList } from '@/api/role'
export default {
  components: {
    FormGroup,
    QueryForm
  },
  data () {
    return {
      Rules: {
        Add: true,
        Edit: true,
        Delete: true,
        AccessModule: true
      },
      QueryList: [
        {
          Name: 'Name',
          type: 'i-input',
          value: '',
          label: '名称'
        },
        {
          Name: 'Status',
          type: 'i-switch',
          value: true,
          label: '状态是否启用'
        },
        {
          Name: 'Remarks',
          type: 'i-input',
          value: '',
          label: '备注'
        }
      ],
      DataTable: {
        Loading: false,
        columns: [
          {
            title: this.$t('tabC.Name'),
            key: 'Name'
          },
          {
            title: this.$t('tabC.Remarks'),
            key: 'Remarks'
          },
          {
            title: this.$t('tabC.Status'),
            key: 'Status',
            render: (h, params) => {
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
                    this.Eidt(params.row.Id)
                  }
                }
              }, this.$t('action.Edit'))
              var DeleteButton = h('Poptip', {
                props: {
                  confirm: true,
                  transfer: true,
                  title: this.$t('msg.confirmDel')
                },
                on: {
                  'on-ok': () => {
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
        List: [],
        Height: 500,
        Total: 0,
        Page: 1,
        limit: 20,
        currentRowId: '' // 选中的行Id
      },
      formList: [
        {
          Name: 'Name',
          type: 'i-input',
          value: '',
          label: '名称',
          rule: [
            { required: true, message: 'The Account cannot be empty', trigger: 'blur' }
          ]
        },
        {
          Name: 'Status',
          type: 'i-switch',
          value: true,
          label: '状态是否启用'
        },
        {
          Name: 'Remarks',
          type: 'i-input',
          value: '',
          label: '备注'
        }
      ],
      ModalFrame: {
        IsOpen: false,
        Isloading: true,
        title: ''
      },
      ModalAccessModule: {
        IsOpen: false,
        Isloading: true,
        title: '',
        RoleName: '',
        NextIndex: 0,
        ModuleList: [], // 模块tree 数据
        ModuleElementList: [], // 按钮 权限数据
        checkedList: [], // 选中的模块数据
        checkElement: [] // 选中的元素

      }
    }
  },
  methods: {
    Add () {
      this.$refs.Form.handleReset() // 重置表单
      this.ModalFrame.title = this.$t('msg.BeingAddDate') // 模态框 修改标题
      this.ModalFrame.IsOpen = true // 打开模态框
    },
    Eidt (Id) {
      this.ModalFrame.title = this.$t('msg.BeingEditDate') // 模态框 修改标题
      this.$refs.Form.valueList = this.DataTable.List.find(u => u.Id === Id) // 表单赋值
      this.ModalFrame.IsOpen = true // 打开模态框
    },
    Delete (Id) {
      DeleteRole({ Id }).then(res => {
        if (res.Code === 200) {
          var index = this.DataTable.List.findIndex(u => u.Id === Id)
          this.DataTable.List.splice(index, 1)
          Msgsuccess(res.Code)
        } else {
          Msgerror(res.Code)
        }
      })
    },
    AccessModule () { // 为角色分配模块
      // console.log(this.DataTable.currentRowId)
      if (this.DataTable.currentRowId === '') {
        Msgerror('请选择角色')
        return
      }
      // this.ModalAccessModule.ModuleList = []
      this.ModalAccessModule.NextIndex = 0
      // 加载Module-tree属性
      this.getRoleModuleTree()
      // 加载 权限 菜单模块
      this.getRoleModuleElementList()

      this.ModalAccessModule.IsOpen = true
    },
    handleQuerySubmit (data) {
      this.getShowDataTable(data)
    },
    handleModalFrame () { // 添加编辑模态框 提交事件
      // console.log(this.$refs.Form.valueList) // 获取表单的数据
      if (!this.$refs.Form.IsVerification()) {
        setTimeout(() => {
          this.ModalFrame.Isloading = false
          this.$nextTick(() => {
            this.ModalFrame.Isloading = true
          })
        }, 500)
        return false
      } else {
        var fromValuelist = this.$refs.Form.valueList
        if (this.ModalFrame.title === this.$t('msg.BeingAddDate')) {
          // -----------添加数据-提交
          AddRole(fromValuelist).then(res => {
            Msgsuccess(res.Code)
            if (res.Code === 200) {
              fromValuelist.Id = res.Result
              // console.log(fromValuelist)
              this.DataTable.List.push(fromValuelist)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          // -----------v编辑数据-提交
          EditRole(fromValuelist).then(res => {
            Msgsuccess(res.Code)
            if (res.Code === 200) {
              var tempindex = this.DataTable.List.findIndex(item => item.Id === this.formItem.Id)
              this.DataTable.List[tempindex] = fromValuelist
              Msgsuccess(res.Code)
            }
          }).catch(err => {
            console.log(err)
          })
        }

        this.ModalFrame.IsOpen = false // 关闭
      }
    },
    handleTablePageChange (index) { //  表格页数改变 事件
      // console.log('')
      this.DataTable.Page = index
      this.getShowDataTable()
    },
    handleTablePageSzieChange (index) { // 表格页数显示数量 改变
      this.DataTable.Page = 1
      this.DataTable.limit = index
      this.getShowData()
    },
    handleTableRowCilck (currentRow, oldCurrentRow) { // 处理表格行点击事件
      this.DataTable.currentRowId = currentRow.Id
      this.ModalAccessModule.RoleName = currentRow.Name
      console.log(this.ModalAccessModule.RoleName)
    },
    handleModalAccessModuleCancel () { // 处理 分配模块 取消
      this.ModalAccessModule.IsOpen = false
      // 清数据
    },
    handleModalAccessModuleUp () { // 处理 分配模块 上一步
      this.ModalAccessModule.NextIndex = this.ModalAccessModule.NextIndex - 1
    },
    handleModalAccessModuleNext () { // 处理 分配模块 下一步
      this.ModalAccessModule.NextIndex = this.ModalAccessModule.NextIndex + 1
      this.ModalAccessModule.checkedList = []
      var checkedList = this.$refs.ModalModuletree.getCheckedNodes() // 获取被选中的tree
      if (this.ModalAccessModule.NextIndex === 1) {
        checkedList.forEach(element => {
          var parentName = element.parentName.split(',')
          var name = []
          if (parentName[0] !== '') {
            name = [...parentName, element.name]
          } else {
            name = [element.name]
          }
          var elementList = []
          this.ModalAccessModule.ModuleElementList.forEach(u => {
            if (u.ModuleId === element.id) { elementList.push(u) }
          })
          var list = {}
          list.name = name
          list.elementList = elementList
          if (list.elementList.length > 0) {
            this.ModalAccessModule.checkedList.push(list)
          }
        })
      }
    },
    handleModalAccessModuleConfirm () { // 提交数据
      var checkedList = this.$refs.ModalModuletree.getCheckedNodes() // 获取被选中的tree
      var ElementId = this.ModalAccessModule.checkElement
      var ModuleId = []
      var RoleId = this.DataTable.currentRowId
      checkedList.forEach(element => {
        ModuleId.push(element.id)
      })
      // console.log(ModuleId)
      SetRoleModuleElementList({ ModuleId, ElementId, RoleId }).then(res => {
        Msgsuccess(res.Code)
        this.ModalAccessModule.IsOpen = false
      })
    },
    getShowDataTable (data) { // 获取表格数据
      var Query = { page: this.DataTable.Page, limit: this.DataTable.limit, ...data }
      GetRoleList(Query).then(res => {
        if (res.Code === 200) {
          this.DataTable.List = res.Data
          this.DataTable.Total = res.Count
        } else {
          Msgerror(res.Code)
        }
      })
    },
    getRoleModuleTree () { // 获取用户模块
      var Id = this.DataTable.currentRowId
      GetRoleModuleTree({ Id }).then(res => {
        this.ModalAccessModule.ModuleList = JSON.parse(res.Result)
        // console.log(this.ModalAccessModule.ModuleList)
      })
    },
    getRoleModuleElementList () { // 获取 菜单元素
      var Id = this.DataTable.currentRowId
      GetRoleModuleElementList({ Id }).then(res => {
        // this.ModalAccessModule.ModuleElementList = JSON.parse(res.Result)
        this.ModalAccessModule.ModuleElementList = res.Result.ModuleElementList
        this.ModalAccessModule.checkElement = res.Result.RoleModuleElementList
        // console.log(this.ModalAccessModule.ModuleElementList)
      })
    },
    getTreeNameList (treelist, Id) { // 获取 上级的名字

    }
  },
  mounted () { // 表格高度 自适应
    this.DataTable.Height = window.innerHeight - this.$refs.Roletable.$el.offsetTop - 130
    window.onresize = () => {
      return (() => {
        this.DataTable.Height = window.innerHeight - this.$refs.Roletable.$el.offsetTop - 180
      })()
    }
  },
  created () {
    this.getShowDataTable()
  }
}
</script>
<style>

</style>
