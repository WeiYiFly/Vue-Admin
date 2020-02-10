<template>
    <div class="layout-wrapper">
      <Layout class="layout-outer">
        <Sider collapsible hide-trigger breakpoint="sm" v-model="collapsed">
          <side-menu :collapsed="collapsed" :list="menuList">
            <img v-show="!collapsed" transfer src='@/assets/img/logo-dark.png' width="200px" height="64px"  />
            <img v-show="collapsed" src='@/assets/img/logo-small.png' width="64px" height="64px" />
          </side-menu>
        </Sider>
        <Layout>
          <Header class="header-wrapper">
            <Icon :class="triggerClasses" @click.native="handleCollapsed"  type="md-menu" :size="32" />
          </Header>
          <Content class="content-con">
            <Card shadow class="page-card">
              //
            </Card>
          </Content>
        </Layout>
      </Layout>
    </div>
</template>
<script>
import SideMenu from '../components/side-menu'

export default {
  components: {
    SideMenu
  },
  data () {
    return {
      collapsed: false,
      menuList: [
        {
          title: 'title1',
          name: 'name1',
          icon: 'ios-alarm'
        },
        {
          title: 'title2',
          name: 'name2',
          icon: 'ios-alarm'
        },
        {
          title: 'title3',
          name: 'name3',
          icon: 'ios-alarm',
          children: [
            {
              title: 'title3-1',
              name: 'name31',
              icon: 'ios-alarm'
            },
            {
              title: 'titl3-2',
              name: 'name32',
              icon: 'ios-alarm',
              children: [
                {
                  title: 'title3-1-1',
                  name: 'name3-1-1',
                  icon: 'ios-alarm'
                },
                {
                  title: 'title3-1-222',
                  name: 'name3-122',
                  icon: 'ios-alarm'
                }
              ]
            }
          ]
        },
        {
          title: 'title4',
          name: 'name4',
          icon: 'ios-alarm',
          children: [
            {
              title: 'title4-1',
              name: 'name41',
              icon: 'ios-alarm'
            }
          ]
        }
      ]

    }
  },
  methods: {
    handleCollapsed () {
      this.collapsed = !this.collapsed
    }
  },
  computed: {
    triggerClasses () {
      return [
        'trigger-icon',
        this.collapsed ? 'rotate' : ''
      ]
    }
  }

}
</script>
<style scoped lang="scss">
.layout-wrapper, .layout-outer{
  height: 100%;
}
.layout-wrapper .header-wrapper{
 background: #fff;
 box-shadow:0 1px 1px 1px rgba(0,0,0,0.1);
 padding: 0 2px
}
.layout-wrapper .header-wrapper .trigger-icon{
  cursor:pointer;
   transition:transform 0.3s ease;//过度

}
.layout-wrapper .header-wrapper .trigger-icon.rotate{
  transform:rotateZ(-90deg);
   transition:transform 0.3s ease;
}
.content-con{
  padding: 5px;
}

</style>
