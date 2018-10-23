
import { INIT_HOME_DATA } from '../constants/homeConstants'

export const initData = (payload, callback) => ({
  type: INIT_HOME_DATA,
  payload,
  callback,
})

export default {}
