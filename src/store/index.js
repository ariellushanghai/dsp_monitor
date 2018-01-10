import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'
import types from './mutations_types'
import * as actions from './actions';
import _ from 'lodash'

Vue.use(Vuex);

const state = {
  user: {},
  all: [],
  selected_workflow: null
};
const getters = {
  workflows: state => {
    return _.map(state.all, (g) => {
      return {
        label: g.label,
        completeness: g.completeness.toFixed(1),
        dom_id: `chart_overall_${g.name}`
      }
    });
  },
  selected_workflow: (state) => state.selected_workflow,
  workflow_menu: state => {
    let menu = _.map(state.all, (g) => {
      let children = [];
      g.workflows.forEach(wf => {
        children.push({
          label: `${wf.name}`,
          rootJobId: wf.rootJobId,
          route: `${wf.name}`
        });
      });
      return {
        name: g.name,
        label: `${g.label} ` + g.completeness.toFixed(1) + `%`,
        children: children
      }
    });
    return menu;
  },
  getWorkflowByName: (state) => (name) => {
    let wfs = [];
    _.forEach(state.all, (g) => {
      wfs.push(g.workflows);
    });
    return _.find(_.flatten(wfs), {'name': name});
  },
  getWorkflowById: (state) => (id) => {
    let wfs = [];
    _.forEach(state.all, (g) => {
      wfs.push(g.workflows);
    });
    // console.log(`_.flatten(wfs): `, _.flatten(wfs))
    return _.find(_.flatten(wfs), {'id': String(id)});
  },
  getCategoryOptions: state => {
    return _.map(state.all, (g) => {
      return {
        name: g.name,
        label: g.label
      }
    });
  }
};

const mutations = {
  // [types.LOGIN]: (state, data) => {
  //   localStorage.token = data;
  //   state.token = data;
  // },
  [types.SET_TREE]: (state, data) => {
    state.all = data;
  },
  [types.SET_ROOTJOB_LAYERS]: (state, data) => {
    // console.log(data);
    _.find(state.all[data.group].workflows, {name: data.workflow}).rootJob = {
      layers: data.layers
    };
  },
  [types.SET_SELECTED_WORKFLOW]: (state, data) => {
    console.log(data);
    if (data) {
      state.selected_workflow = _.find(state.all[data.group].workflows, {name: data.workflow});
    } else {
      state.selected_workflow = null;
    }
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  mutations,
  state,
  getters,
  plugins: [createLogger(),
    createPersistedState({storage: window.sessionStorage})]
});
