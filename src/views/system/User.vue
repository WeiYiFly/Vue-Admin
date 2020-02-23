<template>
    <div  class="view-content">
   <!-- 查询 表单 -->
      <template>
        <query-form ref="Query" :list=QueryList :QueryMethod="handleQuerySubmit"></query-form>
     </template>
  <!-- 数据tabale -->
    <template>
      <div class="view-content-body">
        <Row >
          <Card :padding="2" :bordered="false">
            <Button  v-if="Rules.Add" @click="Add"   type="primary" icon="md-add" style="margin-left:10px">{{$t('action.NewAdd')}}</Button>
            <Button  v-if="Rules.AccessRole" @click="AccessRole"   type="primary" icon="ios-search" style="margin-left:10px">{{$t('为用户分配角色')}}</Button>
         </Card>
        </Row>
        <Table
          border
          highlight-row
          :loading="DataTable.Loading"
          ref="table"
          :columns="DataTable.columns"
          :data="DataTable.List"
          :height=DataTable.Height
          @on-current-change="handleTableRowCilck"></Table>
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
      <Modal
         v-model="ModalAccessRole.IsOpen"
         :loading="ModalAccessRole.Isloading"
        :title="ModalAccessRole.title"
        @on-ok="handleModalAccessRole"
        >
        <Table border ref="RoleTable"
        :columns="ModalAccessRole.col"
        :data="ModalAccessRole.data"
         :height=500></Table>

        </Modal>
    </template>
    </div>
</template>
<script >
import FormGroup from '@/components/form-group'
import QueryForm from '@/components/query-form'
import { Msgsuccess, Msgerror } from '@/lib/message'
import { mapState } from 'vuex'
import { AddUser, GetUserList, DeleteUser, EditUser, SetUserRole, GetUserRoleData } from '@/api/user'
export default {
  components: {
    FormGroup,
    QueryForm
  },
  computed: {
    ...mapState({
      userinfoModuleElementList: state => state.user.userinfo.ModuleElementList,
      userinfoModuleList: state => state.user.userinfo.ModuleList
    })
  },
  data () {
    return {
      Rules: {
        Add: true,
        Edit: true,
        Delete: true,
        AccessRole: true
      },
      QueryList: [
        {
          Name: 'Account',
          type: 'i-input',
          value: '',
          label: '登录帐号'
        },
        {
          Name: 'Name',
          type: 'i-input',
          value: '',
          label: '用户姓名'
        },
        {
          Name: 'PhoneNum',
          type: 'i-input',
          value: '',
          label: '电话'
        },
        {
          Name: 'Email',
          type: 'i-input',
          value: '',
          label: '邮箱'
        },
        {
          Name: 'Status',
          type: 'i-select',
          value: 0,
          label: '状态是否启用',
          children: {
            type: 'i-option',
            list: [
              { value: 0, title: '无' },
              { value: 1, title: '启用' },
              { value: 2, title: '禁用' }
            ]
          }
        }
      ],
      DataTable: {
        Loading: false,
        columns: [
          {
            title: this.$t('tabC.Account'),
            key: 'Account'
          },
          {
            title: this.$t('tabC.Name'),
            key: 'Name'
          },
          {
            title: this.$t('tabC.PhoneNum'),
            key: 'PhoneNum'
          },
          {
            title: this.$t('tabC.Email'),
            key: 'Email'
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
        currentRowId: ''
      },
      formList: [
        {
          Name: 'Account',
          type: 'i-input',
          value: '',
          label: '登录帐号',
          rule: [
            { required: true, message: 'The Account cannot be empty', trigger: 'blur' }
          ]
        },
        {
          Name: 'Name',
          type: 'i-input',
          value: '',
          label: '用户姓名',
          rule: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ]
        },
        {
          Name: 'PhoneNum',
          type: 'i-input',
          value: '',
          label: '电话'
        },
        {
          Name: 'Email',
          type: 'i-input',
          value: '',
          label: '邮箱'
        },
        {
          Name: 'Status',
          type: 'i-switch',
          value: true,
          label: '状态是否启用'
        }
      ],
      ModalFrame: {
        IsOpen: false,
        Isloading: true,
        title: ''
      },
      ModalAccessRole: {
        IsOpen: false,
        Isloading: true,
        title: '',
        data: [
          {
            Name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03',
            _checked: true
          }
        ],
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
          }
        ],
        UserName: ''

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
      DeleteUser({ Id }).then(res => {
        if (res.Code === 200) {
          var index = this.DataTable.List.findIndex(u => u.Id === Id)
          this.DataTable.List.splice(index, 1)
          Msgsuccess(res.Code)
        } else {
          Msgerror(res.Code)
        }
      })
    },
    AccessRole () {
      if (this.DataTable.currentRowId === '') {
        Msgerror('请选择角色')
        return
      }
      this.ModalAccessRole.title = this.$t('给用户<' + this.ModalAccessRole.UserName + '>分配角色') // 模态框 修改标题
      this.getUserRoleData()
      this.ModalAccessRole.IsOpen = true // 打开模态框
    },
    handleQuerySubmit (data) {
      this.DataTable.Page = 1
      this.getShowDataTable()
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
          AddUser(fromValuelist).then(res => {
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
          EditUser(fromValuelist).then(res => {
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
      this.getShowDataTable()
    },
    handleTableRowCilck (currentRow, oldCurrentRow) { // 处理表格行点击事件
      this.DataTable.currentRowId = currentRow.Id
      this.ModalAccessRole.UserName = currentRow.Name
    },
    handleModalAccessRole () { // 分配角色 提交事件
      var UserId = this.DataTable.currentRowId
      var RoleId = []
      var checklist = this.$refs.RoleTable.getSelection()
      checklist.forEach(e => {
        RoleId.push(e.Id)
      })
      SetUserRole({ UserId, RoleId }).then(res => {
        Msgsuccess(res.Code)
        this.ModalAccessRole.IsOpen = false // 打开模态框
      })
    },
    getShowDataTable () { // 获取表格数据
      var data = {}
      if (this.$refs.Query !== undefined) {
        data = this.$refs.Query.valueList
      }
      var Query = { page: this.DataTable.Page, limit: this.DataTable.limit, ...data }
      GetUserList(Query).then(res => {
        if (res.Code === 200) {
          this.DataTable.List = res.Data
          this.DataTable.Total = res.Count
        } else {
          Msgerror(res.Code)
        }
      })
    },
    getUserRoleData () { // 获取 角色数据
      var Id = this.DataTable.currentRowId
      GetUserRoleData({ Id }).then(res => {
        this.ModalAccessRole.data = res.Result
      })
    },
    judgeRules () {
      var Currentmodule = this.userinfoModuleList.find(u => u.RouterName === this.$route.name)
      var ElementList = this.userinfoModuleElementList.filter(function (item, index) {
        if (item.ModuleId === Currentmodule.Id) {
          return item
        }
      })
      for (var i in this.Rules) {
        var index = ElementList.findIndex(u => u.RulesName === i)
        if (index > -1) {
          this.Rules[i] = true
        } else {
          this.Rules[i] = false
        }
      }
    }

  },
  mounted () { // 表格高度 自适应
    this.DataTable.Height = window.innerHeight - this.$refs.table.$el.offsetTop - 130
    window.onresize = () => {
      return (() => {
        this.DataTable.Height = window.innerHeight - this.$refs.table.$el.offsetTop - 180
      })()
    }
  },
  created () {
    this.getShowDataTable()
    this.judgeRules()
  }
}
</script>
<style>

</style>
