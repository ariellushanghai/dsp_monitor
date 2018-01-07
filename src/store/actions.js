import types from './mutations_types'
import API from '@/service/api'
import _ from 'lodash'

export const buildTree = ({commit, state}, input) => {
  let result = {};
  input.summary.forEach((g) => {
    result[g.name] = _.assign(g, {'workflows': []});
  });
  console.log(result);

  input.workflows.forEach(function (wf) {
    result[wf.category].workflows.push({
      name: `${wf.name}`,
      id: `${wf.id}`,
      rootJobId: wf.rootJobId,
      group: wf.category
    });
  });
  commit(types.SET_TREE, result);
};
