<template>
  <el-container class="workflow-form">
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="8"><h2>{{title}}</h2></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-form label-width="110px" size="mini" :rules="rules" ref="form" :model="form">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入WorkFlow名称" clearable></el-input>
            </el-form-item>

            <el-form-item label="所属组" prop="category">
              <el-select v-model="form.category" clearable placeholder="请选择组">
                <el-option v-for="option in category_options" :value="option.name" :key="option.name"
                           :label="option.label"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="RootJob ID" prop="rootJobId">
              <el-input v-model.number="form.rootJobId" placeholder="请输入RootJob ID" clearable></el-input>
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
              <el-button type="danger" @click="deleteWorkFlow" icon="el-icon-delete" :loading="isSending">
                删除本WorkFlow
              </el-button>
              <el-button type="primary" @click="validateForm('form')" icon="el-icon-upload2" :loading="isSending">
                提交
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import API from '@/service/api'

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
          "id": 0,
          "name": '',
          "category": '',
          "rootJobId": '',
          "description": ''
        },
        rules: {
          name: [
            {required: true, message: '请输入WorkFlow名称', trigger: 'blur'}
          ],
          category: [
            {required: true, message: '请选择WorkFlow所属组', trigger: 'change'}
          ],
          rootJobId: [
            {required: true, message: '请输入WorkFlow的rootJobId', trigger: 'blur'},
            {type: 'number', message: 'rootJobId必须为数字值'}
          ]
        },
        form: {
          "id": 0,
          "name": '',
          "category": '',
          "rootJobId": '',
          "description": ''
        },
        isSending: false
      }
    },
    computed: {
      operation() {
        return this.workflow_id === 0 ? '新增' : '编辑';
      },
      title() {
        return this.workflow_id === 0 ? '新增WorkFlow' : `编辑WorkFlow${this.workflow_id}`;
      },
      category_options() {
        return this.$store.getters.getCategoryOptions;
      }
    },
    created() {
      this.fetchWorkflowData();
    },
    mounted() {
      console.log(`mounted()`);
    },
    watch: {
      '$route': 'fetchWorkflowData'
    },
    methods: {
      fetchWorkflowData() {
        let self = this;
        // console.log('self.$route.params: ', Number(self.$route.params.workflow));
        self.workflow_id = Number(self.$route.params.workflow);
        console.log(`operation: ${self.operation}`);
        console.log(`self.$store.getters.workflow_menu:`, self.$store.getters.workflow_menu);
        if (self.operation === '新增') {
          self.form = _.extend(self.form, self.template_of_workflow);
        } else {
          // console.log(`self.workflow_id: `, self.workflow_id);
          let wf = self.$store.getters.getWorkflowById(self.workflow_id);
          console.log(`wf: `, wf);
          if (wf) {
            self.form = _.extend(self.form, _.omit(wf, ['group', 'rootJob']));
            console.log(`omited form: `, self.form)
          }
        }
      },
      postForm(data) {
        let operation = this.operation === '新增' ? 'addWorkflow' : 'editWorkflow';
        API[operation](data).then(res => {
          this.$notify({
            message: `${this.operation}WorkFlow成功`,
            type: 'success',
            duration: 2000
          });
          this.isSending = false;
          if (this.operation === '新增') {
            this.form = _.extend(this.form, this.template_of_workflow);
          }

        }, err => {
          console.log(`err: `, err);
          this.$notify({
            message: `${err}`,
            type: 'error',
            duration: 0
          });
          this.isSending = false;
        });
      },
      validateForm(form) {
        let self = this;
        console.log('validateForm(form): ', form);
        this.$refs[form].validate((valid) => {
          console.log(`valid: `, valid);
          if (valid) {
            // alert('submit!');
            return this.postForm(self.form);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      deleteWorkFlow() {
        console.log('deleteWorkFlow()');
        this.$confirm('继续删除该WorkFlow?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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
