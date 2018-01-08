import Router from 'vue-router'
import {loginURL} from '@/conf/env'


const OverView = r => require(['@/pages/OverView'], r);
const Workflows = r => require(['@/pages/Workflows'], r);


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
    }
  ]
})
