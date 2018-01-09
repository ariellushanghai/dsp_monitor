<template>
  <el-container class="workflow-form">
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="12"><h2>{{title}}</h2></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form ref="form" label-width="110px" size="mini" :rules="rules" :model="form">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入WorkFlow名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="所属组" prop="category">
              <el-select v-model="form.category" placeholder="请选择组">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="RootJob ID" prop="rootJobId">
              <el-input-number v-model="form.rootJobId" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="描述">
              <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 3}"
                placeholder="请输入描述信息"
                v-model="form.description">
              </el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="postForm">提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>

  export default {
    name: 'WorkflowForm',
    metaInfo() {
      return {
        titleTemplate: `%s-${this.title}`
      };
    },
    data() {
      return {
        workflow_id: 0,
        template_of_workflow: {
          "name": "",
          "category": "",
          "rootJobId": null,
          "description": ""
        },
        rules: {
          name: [
            {required: true, message: '请输入WorkFlow名称', trigger: 'blur'}
          ],
          category: [
            {required: true, message: '请选择WorkFlow所属组', trigger: 'change'}
          ],
          rootJobId: [
            {required: true, message: '请输入WorkFlow的rootJobId', trigger: 'change'}
          ]
        },
        form: {}
      }
    },
    computed: {
      operation() {
        return this.workflow_id === 0 ? '新增' : '编辑';
      },
      title() {
        return this.workflow_id === 0 ? '新增WorkFlow' : `编辑WorkFlow${this.workflow_id}`;
      }
    },
    created() {
      // console.log('this.$route.params: ', Number(this.$route.params.workflow));
      this.workflow_id = Number(this.$route.params.workflow);
      console.log(`operation: ${this.operation}`)
      console.log(`this.$store.getters.workflow_menu:`, this.$store.getters.workflow_menu);
      if (this.operation === '新增') {
        this.form = _.extend(this.form, this.template_of_workflow);
      } else {

      }
    },
    mounted() {
      console.log(`mounted()`);

    },
    methods: {
      fetchWorkflowData() {
      },
      validateForm() {

      },
      postForm() {

      }
    },
    components: {}
  }
</script>

<style scoped>
  .workflow-form {
    /*background-color: antiquewhite;*/
    min-height: 100%;
    position: relative;
  }

  .workflow-form h2 {
    text-align: center;
  }
</style>
