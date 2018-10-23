import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Base64 } from 'js-base64'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import RootStack from './RootApp'
import rawDatas from './assets/jobs.json'
import { initData } from './actions/homeActions'

class LoadingAsync extends React.PureComponent {
  componentDidMount() {
    this.loadResourcesAsync()  
  }

  loadResourcesAsync = () => {
    const { doInitdata } = this.props

    let categories = []
    let jobContainer = {}
    rawDatas.forEach(item => {
      let categoryName = item.category
      let categoryKey = ''
      const isCategoryExist = categories.find(cate => cate.name === categoryName) 
      if (isCategoryExist) {
        categoryKey = isCategoryExist.key
        jobContainer = { ...jobContainer, ...{ [categoryKey]: [...jobContainer[categoryKey], item] } }
      } else { 
        categoryKey = Base64.encode(categoryName)
        categories = [...categories, { name: categoryName, key: categoryKey }]
        jobContainer = { ...jobContainer, ...{ [categoryKey]: [item] } }
      }
    })

    doInitdata({ categories, jobContainer })

    this.setState({ isLoading: false })
  }

  render() {
    const { isLoading } = this.props

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <RootStack />
    )
  }
}

const mapDispatchToProps = (dispatch, state) => ({
  ...bindActionCreators({
    doInitdata: initData
  }, dispatch)
})

const mapStateToProps = ({ homeStore }) => {
  const { isFetching } = homeStore

  return ({
    isFetching
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoadingAsync)
