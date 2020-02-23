<template>
<div class="side-menu-wrapper">
  <slot></slot>
  <Menu ref="menu" :active-name="$route.name" :open-names="openNames" width="auto" theme="dark" v-show="!collapsed" @on-select="handleSelect" >
    <template v-for="item in list">
     <re-submenu v-if="item.children"
     :name="item.RouterName"
     :key="`ment_${item.Id}`"
     :parent="item" >
     </re-submenu>
      <menu-item v-else :key="`menu_${item.Id}`" :name="item.RouterName">
        <Icon :type="item.IconName" />
        {{ item.Name }}
      </menu-item>
    </template>
  </Menu>
  <div v-show="collapsed" class="drop-wrapper">
    <template v-for="item in list">
      <re-dropdown @on-select="handleSelect" v-if="item.children" :show-title="false" icon-color="#fff" :key="`drop_${item.Id}`" :parent="item"></re-dropdown>
      <Tooltip v-else transfer :content="item.Name" :key="`drop_${item.Id}`" placement="right">
        <span @click="handleClick(item.RouterName)" class="drop-menu-span">
            <Icon :type="item.IconName" color="#fff" :size="IconSite"></Icon>
          </span>
      </Tooltip>
    </template>
  </div>
</div>
</template>
<script>
import ReSubmenu from './re-submenu.vue'
import ReDropdown from './re-dropdown.vue'
import { getOpenArrByName } from '@/lib/util'
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
  computed: {
    openNames () {
      return getOpenArrByName(this.$route.name, this.list)
    }
  },
  methods: {
    handleSelect (name) {
      // console.log('menu 点击事件')
      // console.log(name)
      this.$router.push({
        name
      })
    },
    handleClick (name) {
      this.$router.push({
        name
      })
      // console.log(name)
    }
  },
  watch: {
    openNames () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  }
}
</script>
<style  lang="scss">
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
