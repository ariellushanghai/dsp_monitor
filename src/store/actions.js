import types from './mutations_types'
import API from '@/service/api'
import _ from 'lodash'

export const buildTree = ({commit, state}, input) => {
  let result = {};
  input.summary.forEach((g) => {
    result[g.name] = _.assign(g, {'workflows': []});
  });


  _.sortBy(input.workflows, ['name']).forEach(function (wf) {
    result[wf.category].workflows.push({
      name: `${wf.name}`,
      id: `${wf.id}`,
      rootJobId: wf.rootJobId,
      group: wf.category,
      category: wf.category,
      description: wf.description
    });
  });
  console.log(result);
  commit(types.SET_TREE, result);
};
