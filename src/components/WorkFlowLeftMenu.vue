<template>
  <el-menu
    router
    class="left-menu"
    :unique-opened=true
    @select="handleSelectMenu"
    background-color="#333644"
    text-color="#fff"
    active-text-color="#EA5505">

    <el-submenu v-for="item in data" :index="String(item.name)" :key="item.name">
      <template slot="title">
        <i class="el-icon-tickets"></i>
        <span>{{item.label}}</span>
      </template>

      <el-menu-item v-for="wf in item.children" :index="String(wf.label)" :key="wf.label"
                    :title="wf.label" :route="wf.route">
        <span slot="title">{{wf.label}}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  import API from '@/service/api'

  export default {
    name: "WorkFlowLeftMenu",
    props: ['data'],
    data() {
      return {};
    },
    mounted() {
      console.log(this.$route)
    },
    methods: {
      fetchData(rootJobId) {
        return API.getLayers(rootJobId);
      },
      handleSelectMenu(key, keyPath) {
        console.log('handleSelectMenu(', key, keyPath, ')');
        let wf = _.find(this.$store.state.all[keyPath[0]].workflows, {name: key});
        console.log(wf);
        if (wf) {
          this.fetchData(wf.rootJobId).then(res => {
            this.$store.commit('SET_ROOTJOB_LAYERS', {
              'group': keyPath[0],
              'workflow': keyPath[1],
              'layers': res
            });
            this.$store.commit('SET_SELECTED_WORKFLOW', {
              'group': keyPath[0],
              'workflow': keyPath[1]
            });
          });
        }
      }
    }
  }
</script>

<style scoped>
  .left-menu .el-submenu .el-menu-item {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .left-menu .el-menu-item {
    font-size: 12px;
  }
</style>
