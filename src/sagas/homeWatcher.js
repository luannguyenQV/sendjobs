import { put, takeLatest, call } from 'redux-saga/effects'

import {
} from '../constants/homeConstants'

/*
function* syncGetSchedule() {
  try {
    const res = yield call(Api.getSchedule)
    yield put({ type: GET_SCHEDULE_SUCCESS, payload: res.data })
  } catch (err) {
    yield put({ type: GET_SCHEDULE_FAIL })
  }
}
*/

export default function* homeWatcher() {}
