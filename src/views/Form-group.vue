<template>
  <div>
      <form-group :list="formList"></form-group>
  </div>
</template>
<script>
import FormGroup from '@/components/form-group'
export default {
  components: {
    FormGroup
  },
  data () {
    return {
      formList: [
        {
          Name: 'Name',
          type: 'i-input',
          value: '',
          label: '姓名',
          rule: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ]

        },
        {
          Name: 'range',
          type: 'slider',
          value: [10, 40],
          range: true,
          label: '范围'
        },
        {
          Name: 'sex',
          type: 'i-select',
          value: '',
          label: '性别',
          children: {
            type: 'i-option',
            list: [
              { value: 'man', title: '男' },
              { value: 'woman', title: '女' }
            ]
          }
        },
        {
          Name: 'education',
          type: 'radio-group',
          value: 1,
          label: '学历',
          children: {
            type: 'radio',
            list: [
              { label: 1, title: '本科' },
              { label: 2, title: '研究生' },
              { label: 3, title: '博士' }
            ]
          }
        },
        {
          Name: 'skill',
          type: 'checkbox-group',
          value: [],
          label: '技能',
          children: {
            type: 'checkbox',
            list: [
              { label: 1, title: 'Vue' },
              { label: 2, title: 'Nodejs' },
              { label: 3, title: 'Mysql' }
            ]
          }
        },
        {
          Name: 'inWork',
          type: 'i-switch',
          value: true,
          label: '在职'
        }
      ]
    }
  }
}
</script>
