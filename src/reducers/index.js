import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer } from 'redux-persist'
import homeStore from './homeReducers'

const rootReducer = combineReducers({
  homeStore
})

export default rootReducer
