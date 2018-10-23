import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'
import reducers from '../reducers'
import rootSagas from '../sagas'

const sagaMiddleware = createSagaMiddleware()

let storeInit
if (__DEV__) {
  // eslint-disable-line
  if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    storeInit = createStore(reducers, {},
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(sagaMiddleware)),
    )
  } else {
    storeInit = createStore(reducers, {}, applyMiddleware(sagaMiddleware))
  }
} else {
  storeInit = createStore(reducers, {}, applyMiddleware(sagaMiddleware))
}

sagaMiddleware.run(rootSagas)
export const persistor = persistStore(storeInit)
export const store = storeInit
