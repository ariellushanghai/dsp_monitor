<template>
  <el-row type="flex" class="row">
    <el-col :span="1">
      <router-link :to="{path: '/'}" class="link col">
        <img src="../assets/images/logo.jpg" class="logo"/>
      </router-link>
    </el-col>
    <el-col :span="3" class="title">
      DSP作业监控
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
    line-height: 60px;
    text-align: center;
    background-color: #EA5505;
    font-size: 20px;
    font-weight: bold;
    color: white;
  }
</style>
