<template>
  <div :id="dom_id" class="chart-workflow"></div>
</template>

<script>
  import API from '@/service/api'
  import _ from 'lodash'
  import vis from 'vis'
  import 'vis/dist/vis-network.min.css'

  export default {
    name: 'ChartJobRelies',
    props: ['dom_id'],
    data() {
      return {
        workflow_data: []
      }
    },
    mounted() {
      this.fetchData();
      // this.renderChart(this.dom_id, this.workflow_data);
    },
    methods: {
      fetchData() {
        API.getWorkflowById2().then(res => {
          this.workflow_data = res;
          console.log('fetched: ', this.workflow_data);
          this.convertToChartData(this.dom_id, res);
        });
      },
      convertToChartData(dom_id, raw_data) {
        console.log('raw_data: ', raw_data);
        let chart_data = {};
        let ns = [];
        let es = [];
        raw_data.vertexNodes.forEach(function (v) {
          ns.push({
            id: v.dataId,
            status: v.data.status,
            label: (v.data.name ? v.data.name : v.workflow),
            // label: v.dataId,
            // title: (v.data.name ? v.data.name : v.workflow) + `状态: ${v.data.status}`,
            title: `ID: ${v.dataId},状态: ${v.data.status}`,
            shape: (v.dataType === 'WORKFLOW' ? 'box' : 'dot'),
            group: v.data.status,
            level: v.levels,
            x: v.levels * 400,
            y: v.orders * 75 - 50
          })
        });
        raw_data.edgeNodes.forEach(function (e) {
          if (e.sourceVexId !== e.targetVexId) {
            return es.push({
              from: e.sourceVexId,
              to: e.targetVexId
            });
          }
        });
        console.log('ns: ', ns);
        console.log('es: ', es);
        chart_data.nodes = new vis.DataSet(ns);
        chart_data.edges = new vis.DataSet(es);

        return this.renderChart(this.dom_id, chart_data);
      },
      renderChart(dom_id, converted_data) {

        // 获取所有相连节点
        let getConnectedNodes = function (graph, nodeID) {
          return graph.getConnectedNodes(nodeID);
        };
        // create a network
        console.log('this.dom_id: ', this.dom_id);
        let container = document.getElementById('chart_workflow');

        let options = {
          autoResize: true,
          height: '100%',
          width: '100%',
          locale: 'en',
          nodes: {
            // widthConstraint: 500,
            size: 15,
            font: {
              size: 20,
              color: 'black'
            },
            borderWidth: 2,
            fixed: true
          },
          edges: {
            // smooth: true,
            color: {
              inherit: 'from'
            },
            arrows: {

              to: {
                enabled: true,
                scaleFactor: 1,
                type: 'arrow'
              }
            },
            arrowStrikethrough: false,
            chosen: {
              edge: function (values, id, selected, hovering) {
                console.log('chosen edge: ', arguments);
              }
            }
          },
          groups: {
            'RUNNING': {
              color: {background: '#007bff'}
            },
            'DONE': {
              color: '#28a745'
              // size: 50
            },
            'ERROR': {
              color: '#dc3545'
              // size: 50
            },
            'PENDING': {
              color: '#ffc107'
              // size: 50
            }
          },
          layout: {
            // hierarchical: {
            //   direction: 'LR',
            //   sortMethod: 'directed',
            //   levelSeparation: 300
            // }
            improvedLayout: true
          },
          // physics: {
          //   "forceAtlas2Based": {
          //     "springLength": 100
          //   },
          //   "minVelocity": 0.75,
          //   "solver": "forceAtlas2Based"
          // },
          interaction: {
            selectConnectedEdges: true,
            zoomView: true
          }
        };
        let network = new vis.Network(container, converted_data, options);
        network.on('doubleClick', function (params) {
          console.log('on doubleClick: ', arguments);
          if (params.nodes && params.nodes.length) {
            console.log(params.nodes[0], '<-->', getConnectedNodes(network, params.nodes[0]));
          }
        });
      }
    },
    components: {}
  }
</script>

<style scoped>
  .chart-workflow {
    width: 100%;
    height: 100%;
  }
</style>
