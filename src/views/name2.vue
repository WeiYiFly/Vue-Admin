<template>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
            <i-input type="text" v-model="formInline.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
        </FormItem>
        <FormItem prop="password">
            <i-input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
        </FormItem>
         <FormItem>
              <!-- <treeSelect :treeData=treeData v-model="model"></treeSelect> -->
                <treeselect :multiple="true" v-model="value"  :options="options" :children=null />
        </FormItem>
        <FormItem :Label="22">
            <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
             <Button @click="handleSubmitV">Signin</Button>
        </FormItem>
    </Form>

</template>
<script>
// import TreeSelect from '../components/treeSelect'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { Msgsuccess } from '@/lib/message'
export default {
  components: {
    // TreeSelect
    Treeselect
  },
  data () {
    return {
      model: '',
      treeData: [
        {
          id: '1',
          title: 'parent 1',
          expand: true,
          children: [
            {
              id: '1-1',
              title: 'parent 1-1',
              checked: true,
              expand: true,
              children: [
                {
                  id: '1-1-1',
                  title: 'leaf 1-1-1'
                },
                {
                  id: '1-1-2',
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              id: '1-2',
              title: 'parent 1-2',
              expand: true,
              children: [
                {
                  id: '1-2-1',
                  title: 'leaf 1-2-1'
                },
                {
                  id: '1-2-1',
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ],
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      },
      value: null,
      // define options
      options: [{
        id: 'a',
        label: 'a  <Button @click="handleSubmitV">Signin</Button>',
        children: [{
          id: 'aa',
          label: 'aa'
        }, {
          id: 'ab',
          label: 'ab',
          children: undefined
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
      }]
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleSubmitV () {
      console.log(this.value)
      Msgsuccess(200)
    }
  },
  computed: {
    TT () {
      console.log(this.value)
      return this.value
    }
  }
}
</script>
