<template>
  <el-row type="flex" class="row">
    <el-col :sm="1" :md="1" :lg="2" :xl="2">
      <router-link :to="{path: '/'}" class="link col">
        <img src="../assets/images/logo.jpg" class="logo"/>
      </router-link>
    </el-col>
    <el-col :sm="3" :md="3" :lg="2" :xl="2" class="title">
      <span>DSP作业监控</span>
    </el-col>
    <el-col :span="20">
      <el-menu mode="horizontal" background-color="#333644" text-color="#fff" active-text-color="#EA5505"
               :default-active="defaultActive" router>
        <el-menu-item index="/overview">概览</el-menu-item>
        <el-menu-item index="/workflows/all">WorkFlows</el-menu-item>
        <el-menu-item index="/workflowform/0">新建WorkFlow</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'GlobalHeader',
    data() {
      return {
      }
    },
    computed: {
      defaultActive() {
        if (/^\/workflows\//.exec(this.$route.path)) {
          return '/workflows/all'
        }
        if (/^\/workflowform\//.exec(this.$route.path)) {
          return '/workflowform/0'
        }
        return this.$route.path;
      }
    }
  }
</script>

<style scoped>
  .row {
    height: 100%;
  }

  .col {
    height: 100%;
    background-color: #35495e;
  }

  .link {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #EA5505;
  }

  .logo {
    display: block;
    flex-grow: 0;
    flex-shrink: 0;
    width: 82px;
    height: auto;
    max-height: 60px;
  }

  .title {
    justify-content: center;
    line-height: 60px;
    text-align: center;
    background-color: #EA5505;
    font-size: 20px;
    font-weight: bold;
    color: white;
  }
</style>
