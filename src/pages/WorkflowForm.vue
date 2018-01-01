<template>
  <el-container class="workflow-form">
    <el-main>
      <el-row><el-col><h1>{{operation}}</h1></el-col></el-row>
      <el-row :gutter="20">
        <el-col :span="12"></el-col>
        <el-col :span="12"></el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>

export default {
  name: 'WorkflowForm',
  metaInfo: {
    titleTemplate: `%s-编辑WorkFlow`
  },
  data () {
    return {
      operation: '编辑',
    }
  },
  created() {
    this.operation = Number(this.$route.params.operation) === 0 ? '新增' : '编辑';
  },
  mounted () {

  },
  methods: {
    fetchData () {
    },
    renderChart () {

    }
  },
  components: {

  }
}
</script>

<style scoped>
  .workflow-form {
    background-color: antiquewhite;
    min-height: 100%;
    position: relative;
  }
</style>
