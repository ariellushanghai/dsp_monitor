<template>
  <el-container class="workflows">
    <el-main class="workflows-main">
      <el-row type="flex" style="height: 100%;">
        <el-col :span="4"
                style="height: 100%;background-color: #333644;overflow-y: auto;">
          <el-row type="flex">
            <el-col :span="24" style="">
              <work-flow-left-menu :data="workflow_menu_data"></work-flow-left-menu>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="20" style="height: 100%;position: relative;overflow: hidden;">
          <el-main style="padding: 0;height: 100%;width: 100%;position: relative;">
            <el-row type="flex" align="middle" class="chart-buttons-container">
              <el-col :xs="18" :sm="18" :md="19" :lg="20" :xl="21" class="title">
                <div style="padding: 0 20px;">{{selected_workflow.name}}</div>
                <div>更新于：{{timestamp_data_fetched}}</div>
              </el-col>
              <el-col :xs="6" :sm="6" :md="5" :lg="4" :xl="3">
                <div class="buttons-group">
                  <el-button @click="refreshAll" :loading="isLoading" type="primary" icon="el-icon-refresh"
                             size="small">刷新
                  </el-button>
                  <el-button @click="goToForm" type="primary" icon="el-icon-edit" size="small">编辑</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row class="chart-tabs-container">
              <el-tabs class="chart-tabs" type="border-card" v-model="activeLayerName">
                <el-tab-pane class="chart-tabs-pane" v-for="tab in selected_workflow_layers_keys"
                             :name="tab" :label="tab" :key="tab">
                  <layer-table :layer="selected_workflow_layers[tab]"
                               v-on:rowClick="openJobReliesDialog"></layer-table>

                </el-tab-pane>
              </el-tabs>
            </el-row>
            <el-dialog :title="chart_title" :visible.sync="dialogJobReliesVisible"
                       custom-class="job-relies-chart"
                       :before-close="handleCloseDialog"
                       :close-on-click-modal=false :show-close=true :modal=false fullscreen center>
              <ChartJobRelies :dom_id="chart_workflow_DOM_ID"
                              :root_job="selected_root_job"></ChartJobRelies>
            </el-dialog>
          </el-main>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import LayerTable from '@/components/LayerTable'
  import ChartJobRelies from '@/components/ChartJobRelies'
  import WorkFlowLeftMenu from '@/components/WorkFlowLeftMenu'
  import store from '@/store/'
  import router from '@/router'
  import API from '@/service/api'
  import _ from 'lodash'

  export default {
    name: 'Workflows',
    metaInfo: {
      titleTemplate: '%s-Workflows'
    },
    data: function () {
      return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        chart_workflow_DOM_ID: 'chart_workflow',
        chart_title: 'JOB依赖关系',
        dialogJobReliesVisible: false,
        selected_root_job: null,
        isLoading: false,
        timestamp_data_fetched: (new Date()).toLocaleString()
      }
    },
    computed: {
      workflow_menu_data() {
        return this.$store.getters.workflow_menu;
      },
      selected_workflow() {
        return this.$store.getters.selected_workflow;
      },
      selected_workflow_layers() {
        return this.selected_workflow.rootJob.layers;
      },
      selected_workflow_layers_keys() {
        console.log('this.selected_workflow: ', this.selected_workflow)
        return Object.keys(this.selected_workflow.rootJob.layers);
      },
      activeLayerName: {
        get: function () {
          console.log('this.selected_workflow_layers_keys[0]: ', this.selected_workflow_layers_keys[0]);
          return this.selected_workflow_layers_keys[0];
        },
        set: function (newValue) {
          return newValue;
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      console.log('Workflows beforeRouteEnter()');
      if (_.isEmpty(store.getters.workflow_menu)) {
        return router.push({name: 'overview'});
      }
      // 重定向去取第一个非空的Workflow
      if (to.params && to.params.workflow === 'all') {
        console.log('all');
        console.log('store.getters.workflow_menu: ', store.getters.workflow_menu);

        return store.getters.workflow_menu.forEach((g) => {
          if (g.children.length > 0) {
            console.log(g.children[0].label);
            router.push({name: 'workflows', params: {workflow: g.children[0].label}})
            return next();
          }
        });
      } else {
        //获取第一个非空的Workflow的rootJobId对应的layers,预渲染[layers]
        console.log(to.params.workflow);
        let wf = store.getters.getWorkflowByName(to.params.workflow);
        console.log('wf: ', wf)
        if (wf) {
          store.commit('SET_SELECTED_WORKFLOW', {
            'group': wf.group,
            'workflow': wf.name
          });
          API.getLayers(wf.rootJobId).then(res => {
            console.log('wf: ', wf);
            console.log('res: ', res);
            // debugger;
            store.commit('SET_ROOTJOB_LAYERS', {
              'group': wf.group,
              'workflow': wf.name,
              'layers': res
            });
            return next();
          });
        }
      }
    },
    mounted: function () {
      console.log('Workflows mounted()');
      this.refreshAll();
    },
    methods: {
      fetchData(what, param) {
        switch (what) {
          case 'all':
            return API.getAll();
            break;
          case 'layers':
            return API.getLayers(param);
            break;
          default:
            console.log(`fetchData(${arguments})`);
        }
      },
      refreshAll() {
        console.log('refreshAll()');
        this.isLoading = true;
        this.fetchData('all').then(res => {
          this.$store.dispatch('buildTree', res);
          this.$notify({
            message: `数据已更新`,
            type: 'success',
            duration: 2000
          });
          this.isLoading = false;
          this.timestamp_data_fetched = (new Date()).toLocaleString();
        }, err => {
          console.log(`err: `, err);
          this.$notify({
            message: `${err}`,
            type: 'error',
            duration: 0
          });
          this.isLoading = false;
        });
      },
      openJobReliesDialog(job) {
        console.log(`openJobReliesDialog(`, job, `)`);
        this.selected_root_job = job;
        this.dialogJobReliesVisible = true;
        this.chart_title = `job: ${job.id}依赖关系`;
      },
      handleCloseDialog(done) {
        return done();
      },
      goToForm() {
        console.log(`selected_workflow: ${this.selected_workflow.id}`);
        return router.push({name: 'workflowform', params: {workflow: this.selected_workflow.id}});
      }
    },
    components: {
      LayerTable,
      ChartJobRelies,
      WorkFlowLeftMenu
    }
  }
</script>

<style>
  .workflows {
    background-color: antiquewhite;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .workflows .workflows-main {
    padding: 0;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .chart-tabs-container {
    width: 100%;
    height: calc(100% - 40px);
  }

  .chart-buttons-container {
    color: rgb(234, 85, 5);
    background-color: rgb(51, 54, 68);
    height: 40px;
  }

  .title {
    display: flex;
    justify-content: space-between;
  }

  .buttons-group {
    display: flex;
    justify-content: flex-end;
  }

  .chart-tabs {
    height: 100%;
  }

  .left-menu {
    border-right: 1px solid #333644;
  }

  .el-dialog--center .el-dialog__header {
    background-color: antiquewhite;
    padding-top: 15px;
    max-height: 49px;
  }

  .el-dialog--center .el-dialog__body {
    background-color: antiquewhite;
    padding: 0;
    width: 100%;
    height: calc(100% - 49px);
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #F56C6C;
  }

</style>
