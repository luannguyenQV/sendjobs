// root sagas
import { all } from 'redux-saga/effects'
import homeWatcher from './homeWatcher'

export default function* rootSagas() {
  yield all([
    homeWatcher(),
  ])
}
