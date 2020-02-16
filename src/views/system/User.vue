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
          <Card>
            <button v-if="Rules.Add" type="button" @click="Add" class="ivu-btn ivu-btn-primary" >
              <icon type="ivu-icon ivu-icon-md-add"></icon> <span>{{$t('action.NewAdd')}}</span>
            </button>
         </Card>
        </Row>
        <Table
          :loading="DataTable.Loading"
          ref="table"
          :columns="DataTable.columns"
          :data="DataTable.List"
          :height=DataTable.Height border></Table>
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
    </template>
    </div>
</template>
<script >
import FormGroup from '@/components/form-group'
import QueryForm from '@/components/query-form'
import { Msgsuccess, Msgerror } from '@/lib/message'
import { AddUser, GetUserList, DeleteUser, EditUser } from '@/api/user'
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
        Delete: true
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
          type: 'i-switch',
          value: true,
          label: '状态是否启用'
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
        limit: 20
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
        title: 'aa'
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
      this.getShowData()
    },
    getShowDataTable (data) { // 获取表格数据
      var Query = { page: this.DataTable.Page, limit: this.DataTable.limit, ...data }
      GetUserList(Query).then(res => {
        if (res.Code === 200) {
          this.DataTable.List = res.Data
          this.DataTable.Total = res.Count
        } else {
          Msgerror(res.Code)
        }
      })
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
  }
}
</script>
<style>

</style>
