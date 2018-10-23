import React from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from './src/store'
import AppLoading from './src/AppLoading'

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <AppLoading />
      </Provider>
    )
  }
}
