<template>
    <div class="layout-wrapper">
      <Layout class="layout-outer">
        <Sider collapsible hide-trigger breakpoint="sm"  v-model="collapsed" class="sider-outer">
          <side-menu :collapsed="collapsed" :list="menuList" >
            <img v-show="!collapsed" transfer src='@/assets/img/logo-dark.png' width="200px" height="64px"  />
            <img v-show="collapsed" src='@/assets/img/logo-small.png' width="64px" height="64px" />
          </side-menu>
        </Sider>
        <Layout>
          <Header class="header-wrapper">
            <Icon :class="triggerClasses" @click.native="handleCollapsed"  type="md-menu" :size="32" />
          </Header>
          <Content class="content-con">
            <div>
              <Tabs :animated="false" @on-click="handleClickTab"  type="card" :value="getTabNameByRoute($route)" >
                   <TabPane v-for="(item,index) in tabList"
                   :key="`tabNav${index}`"
                   :label="labelRender(item)"
                   :name="getTabNameByRoute(item)"  >
                    </TabPane>
              </Tabs>
            </div>
            <div class="view-box">
              <Card shadow class="page-card">
                <router-view/>
              </Card>
          </div>
          </Content>
        </Layout>
      </Layout>
    </div>
</template>
<script>
import SideMenu from '../components/side-menu'
import { mapState, mapMutations, mapActions } from 'vuex'
import { getTabNameByRoute, getRouteById } from '@/lib/util'
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
          name: 'name11111name11111111name11111111111',
          icon: 'ios-alarm'
        },
        {
          title: 'title2',
          name: 'name2',
          icon: 'ios-alarm'
        },
        {
          title: 'table1',
          name: 'table1',
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
                  title: 'table2',
                  name: 'table2',
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
      ],
      getTabNameByRoute

    }
  },
  watch: {
    '$route' (newRoute) {
      this.UPDATE_ROUTER(newRoute)
    }
  },
  methods: {
    ...mapMutations([
      'UPDATE_ROUTER'
    ]),
    ...mapActions([
      'handleRemove'
    ]),
    handleCollapsed () {
      this.collapsed = !this.collapsed
    },
    handleClickTab (name) {
      const route = getRouteById(name)
      this.$router.push(route)
    },
    handleTabRemove (id, event) {
      event.stopPropagation() // 阻止冒泡
      this.handleRemove({
        id,
        $route: this.$route
      }).then(nextRoute => {
        this.$router.push(nextRoute)
      })
    },
    labelRender (item) {
      return h => {
        return (
          <div>
            <span>{item.name}</span>
            <icon nativeOn-click={this.handleTabRemove.bind(this, getTabNameByRoute(item))} type="md-close-circle" style="line-height:12px;margin-right: -5px" size="20" ></icon>
          </div>
        )
      }
    }
  },
  computed: {
    triggerClasses () {
      return [
        'trigger-icon',
        this.collapsed ? 'rotate' : ''
      ]
    },
    ...mapState({
      tabList: state => state.tabNav.tabList
    })
  }

}
</script>
<style lang="scss">
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
  padding: 0px;
}
.sider-outer{
  height: 100%;
  overflow: hidden ;
}
.layout-outer .ivu-layout-sider-children {
    margin-right: -20px;
    overflow-y: scroll;
    overflow-x: hidden;
}

.layout-wrapper, .layout-outer .content-con .ivu-tabs-bar{
  margin-bottom: 0;
}
.layout-wrapper, .layout-outer .content-con .view-box{
  margin-bottom: 0;
}
.layout-wrapper, .layout-outer .page-card{
    min-height: "calc(100vh - 84px)";
}

</style>
