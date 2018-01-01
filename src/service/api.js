import network from '@/service/network'

export default {
//  all
  getAll() {
    return network.get('dspmonitor_all.json');
  },
  getWorkflowById() {
    return network.get('getworkflowbyid_350351.json');
  },
  getWorkflowById2() {
    return network.get('workflow_6368_WORK_FLOW_SUB_1.json');
  },
  getLayers(rootJobId) {
    return network.get('layers.json');
  },
  getJobRelies(jobId) {
    return network.get('jobRelies.json');
  }
}
