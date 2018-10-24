import * as types from '../constants/homeConstants'

const INITIAL_STATE = {
  isFetching: true
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.INIT_HOME_DATA:
      return { ...action.payload, ...{ isFetching: false } } 
    case types.DELETE_JOB: 
      const { categoryKey, itemKey } = action.payload
      const newJobItems = state.jobContainer[categoryKey].filter(item => item._id !== itemKey)
      return  { ...state, ...{ 'jobContainer':  { ...state.jobContainer, [categoryKey]: newJobItems } } }
    default:
      return state
  }
}
