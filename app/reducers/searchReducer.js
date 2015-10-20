import _ from 'lodash';

import ActionTypes from 'constants/ActionTypes';
import { pickSupportedFilters } from 'utils/SearchUtils';

export function searchReducer(state, action) {
  switch (action.type) {

  case ActionTypes.CHANGE_SEARCH_FILTERS:
    const filters = pickSupportedFilters(action.payload);
    return state.merge({ filters }, { deep: true });

  case ActionTypes.FETCH_RESOURCES_SUCCESS:
    const results = _.keys(action.payload.entities.resources);
    return state.merge({ results });

  default:
    return state;
  }
}