<template>
<div class="side-menu-wrapper">
  <slot></slot>
  <Menu width="auto" theme="dark" v-show="!collapsed" @on-select="handleSelect" >
    <template v-for="item in list">
     <re-submenu v-if="item.children"
     :name="item.name"
     :key="`ment_${item.name}`"
     :parent="item" >
     </re-submenu>
      <menu-item v-else :key="`menu_${item.name}`" :name="item.name">
        <Icon :type="item.icon" />
        {{ item.title }}
      </menu-item>
    </template>
  </Menu>
  <div v-show="collapsed" class="drop-wrapper">
    <template v-for="item in list">
      <re-dropdown @on-select="handleSelect" v-if="item.children" :show-title="false" icon-color="#fff" :key="`drop_${item.name}`" :parent="item"></re-dropdown>
      <Tooltip v-else transfer :content="item.title" :key="`drop_${item.name}`" placement="right">
        <span @click="handleClick(item.name)" class="drop-menu-span">
            <Icon :type="item.icon" color="#fff" :size="IconSite"></Icon>
          </span>
      </Tooltip>
    </template>
  </div>
</div>
</template>
<script>
import ReSubmenu from './re-submenu.vue'
import ReDropdown from './re-dropdown.vue'
export default {
  name: 'SideMenu',
  components: {
    ReSubmenu,
    ReDropdown
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => [{}]
    },
    IconSite: {
      type: Number,
      default: 25
    }
  },
  methods: {
    handleSelect (name) {
      console.log(name)
      // this.$router.push({
      //   name
      // })
    },
    handleClick (name) {
      console.log(name)
    }
  }
}
</script>
<style scoped lang="scss">
.side-menu-wrapper{
  width:100%;
}
.side-menu-wrapper  .ivu-tooltip, .drop-menu-span{
    display: block;
    width: 100%;
    text-align: center;
    padding: 5px 0;
    height: 50px;
  }
// .side-menu-wrapper .drop-wrapper .ivu-dropdown{
//     display: block;
//     padding: 17px;
//     margin: 0 auto;
//   }
</style>
