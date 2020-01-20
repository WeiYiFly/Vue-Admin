<template>
  <Submenu :name="parent.RouterName">
    <template slot="title">
      <Icon :type="parent.IconName" />
      {{ parent.Name }}
    </template>
    <template v-for="item in parent.children">
        <re-submenu
          v-if="item.children"
          :key="`menu_${item.Id}`"
          :name="item.RouterName"
          :parent="item"
        >
        </re-submenu>
        <menu-item v-else :key="`menu_${item.Id}`" :name="item.RouterName">
          <Icon :type="item.IconName" />
          {{ item.Name }}
        </menu-item>
      </template>
  </Submenu>
</template>

<script>
export default {
  name: 'ReSubmenu',
  props: {
    parent: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style>

</style>
