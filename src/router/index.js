import Router from 'vue-router'
import {loginURL} from '@/conf/env'


const OverView = r => require(['@/pages/OverView'], r);
const Workflows = r => require(['@/pages/Workflows'], r);
const WorkflowForm = r => require(['@/pages/WorkflowForm'], r);


export default new Router({
  routes: [
    {
      name: 'index',
      redirect: {
        name: 'overview'
      },
      path: '/'
    },
    {
      name: 'overview',
      path: '/overview',
      component: OverView
    },
    {
      name: 'workflows',
      path: '/workflows/:workflow',
      component: Workflows
    },
    {
      name: 'workflow_form',
      path: '/workflow_form/:operation',
      component: WorkflowForm
    }
  ]
})
