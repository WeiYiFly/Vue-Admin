<template>
  <Dropdown transfer @on-click="handleClick" placement="right-start" class="ivu-tooltip">
    <span class="drop-menu-span" :style="titleStyle">
      <Icon :type="parent.IconName" :color="iconColor" :size="IconSite"></Icon>
      <span v-if="showTitle">{{ parent.Name }}</span>
    </span>
    <DropdownMenu slot="list" >
      <template v-for="item in parent.children">
        <re-dropdown v-if="item.children" :key="`drop_${item.Id}`" :parent="item"></re-dropdown>
        <DropdownItem v-else :key="`drop_${item.Id}`" :name="item.RouterName">
          <Icon :type="item.IconName" color="#515a6e" :size="IconSite"></Icon>
          {{ item.Name }}
        </DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
export default {
  name: 'ReDropdown',
  props: {
    parent: {
      type: Object,
      default: () => ({})
    },
    iconColor: {
      type: String,
      default: '#515a6e'
    },
    IconSite: {
      type: Number,
      default: 25
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    titleStyle () {
      return {
        textAlign: this.showTitle ? 'left' : 'center',
        paddingLeft: this.showTitle ? '16px' : ''
      }
    }
  },
  methods: {
    handleClick (name) {
      if (!this.showTitle) this.$emit('on-select', name)
    }
  }
}
</script>

<style>

</style>
