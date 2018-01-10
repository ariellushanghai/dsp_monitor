import network from '@/service/network'

export default {
//  all
  getAll() {
    // return network.get('dspmonitor_all.json');
    return network.get('/all');
  },
  getLayers(jobId) {
    // return network.get('layers.json');
    return network.get('/layers', {
      params: {
        'jobId': jobId
      }
    });
  },
  getJobRelies(jobId) {
    console.log(`getJobRelies(${jobId})`);
    // return network.get('jobRelies.json');
    return network.get('/jobRelies', {
      params: {
        'jobId': jobId
      }
    });
  },
  addWorkflow(payload) {
    return network.post('/workflow/add', payload);
  },
  editWorkflow(payload) {
    return network.post('/workflow/edit', payload);
  },
  deleteWorkflow(id) {
    return network.post('/workflow/delete', payload);
  }
}
