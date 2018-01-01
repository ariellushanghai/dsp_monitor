export default {
  'SET_TREE': 'SET_TREE', // 把/all接口返回的{summary,workflows}合并为summary.workflows
  'SET_ROOTJOB_LAYERS': 'SET_ROOTJOB_LAYERS', // 把/layers接口返回的[BASE,RAW,MID]追加到对应的summary.workflow.rootJob.layers.BASE[id,id,id...]
  'SET_SELECTED_WORKFLOW': 'SET_SELECTED_WORKFLOW'
}
