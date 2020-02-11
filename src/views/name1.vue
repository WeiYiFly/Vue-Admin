<template>
<div>
 <p>name1111111</p>
     <Form :model="formItem" :label-width="80">
        <FormItem label="Input">
            <input v-model="formItem.input" placeholder="Enter something...">
        </FormItem>

      </Form>
</div>
</template>
<script>
export default {
  data () {
    return {
      formItem: {
        input: ''
      }
    }
  }
}
</script>
