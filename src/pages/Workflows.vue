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
            <el-row class="chart-tabs-container">
              <el-tabs class="chart-tabs" type="border-card" @tab-click="handleLayerTabClick">
                <el-tab-pane class="chart-tabs-pane" v-for="tab in selected_workflow_layers_keys" :name="tab"
                             :label="tab" :key="tab">
                  <layer-table :layer="selected_workflow_layers[tab]" v-on:rowClick="openJobReliesDialog"></layer-table>

                </el-tab-pane>
              </el-tabs>
            </el-row>
            <el-dialog :title="chart_title" :visible.sync="dialogJobReliesVisible" custom-class="job-relies-chart"
                       :close-on-click-modal=false :show-close=true :modal=false fullscreen center>
              <ChartJobRelies :dom_id="chart_workflow_DOM_ID" :data="selected_job_relies_data"></ChartJobRelies>
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
  import API from '@/service/api'

  export default {
    name: 'Workflows',
    metaInfo: {
      titleTemplate: '%s-Workflows'
    },
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        chart_workflow_DOM_ID: 'chart_workflow',
        chart_title: 'JOB依赖关系',
        dialogJobReliesVisible: false,
        selected_job_relies_data: {}
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
        return Object.keys(this.selected_workflow.rootJob.layers);
      },
      active_workflow_layer_key() {
        return this.selected_workflow_layers_keys[0];
      }
    },
    mounted() {
      this.fetchData('all');
    },
    methods: {
      fetchData(what, param) {
        switch (what) {
          case 'all':
            API.getAll().then(res => {
              this.$store.dispatch('buildTree', res);
            });
            break;
          case 'relies':
            API.getJobRelies(param).then(res => {
              // this.$store.dispatch('buildTree', res);

            });
            break;
          default:
            console.log(`fetchData(${arguments})`);
        }
      },
      handleLayerTabClick(tab, event) {
        console.log('handleLayerTabClick(', tab, event, ')');
      },
      openJobReliesDialog(jobId) {
        console.log(`openJobReliesDialog(${jobId})`);
        this.dialogJobReliesVisible = true;
        this.chart_title = `job: ${jobId}依赖关系`;
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
    height: 100%;
  }

  .chart-tabs {
    height: 100%;
  }

  .left-menu {
    border-right: 1px solid #333644;
  }

  .el-dialog--center .el-dialog__header {
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
