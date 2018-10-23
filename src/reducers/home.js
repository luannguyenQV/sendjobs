import * as types from '../constants/homeConstants'

const INITIAL_STATE = {
  isFetching: true
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.INIT_HOME_DATA:
      return { ...action.payload, ...{ isFetching: false } } 
    default:
      return state
  }
}
