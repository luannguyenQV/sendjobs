
import { INIT_HOME_DATA, DELETE_JOB } from '../constants/homeConstants'

export const initData = (payload, callback) => ({
  type: INIT_HOME_DATA,
  payload,
  callback,
})
export const deleteJob = (payload, callback) => ({
  type: DELETE_JOB,
  payload,
  callback,
})

export default {}
