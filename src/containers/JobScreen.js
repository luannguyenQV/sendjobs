import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
import SwipeableItem from '../components/common/elements/SwipeableItem'
import { bindActionCreators } from 'redux'
import { deleteJob } from '../actions/homeActions'

const rowHeight = 100

const REGEX_FIRST_SENTENCE = /(^.*?[a-z]{2,}[.!?])\s+\W*[A-Z]/

function getFirstSentence(data) {
  let arr = REGEX_FIRST_SENTENCE.exec(data);
  return arr[1]; 
}

const JobItem = ({ detailIndex, index, onPressRow, item, categoryKey, doDeleteJob }) => (
  <SwipeableItem deleteItem={() => doDeleteJob({ categoryKey, itemKey: item._id})}>
    <TouchableOpacity
      onPress={() => onPressRow()}
    >
      <View style={styles.jobItem}>
        <Image
          style={styles.image}
          source={{uri: item.image}}
        />      
        <View style={styles.data}>
          <Text style={styles.dataTitle}>{item.title}</Text>
          <Text 
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={styles.dataDescription}
          >
            {getFirstSentence(item.description)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    {detailIndex === index &&
      <View style={styles.detailItem}>
        <Text numberOfLines={5}>{item.description}</Text>
      </View>
    }
  </SwipeableItem>
)

class JobScreen extends React.Component {
  static navigationOptions = ({ navigation, props }) => ({
    title: 'Job detail',
    headerTintColor: '#2f2a2a',
  })

  state = {
    detailIndex: null
  }

  onRefresh = () => {}

  onLoadMore = () => {}

  onPressRow = index => {
    const { detailIndex } = this.state
    this.setState({
      detailIndex: detailIndex === index ? null : index
    })
    if (this.flatlist) {
      this.flatlist.scrollToOffset({
        animated: true,
        offset: index * (rowHeight + 1) - 10
      })
    }
  }

  render() {
    const { navigation, jobContainer, doDeleteJob } = this.props
    const { detailIndex } = this.state
    const categoryKey = navigation.getParam('key', '')
    const categoryName = navigation.getParam('name', '')
    let jobs = []
    if (categoryKey) {
      jobs = jobContainer[categoryKey]
    }

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{categoryName}</Text>
        </View>
        <FlatList 
          ref={flatlist => {
            this.flatlist = flatlist
          }}
          extraData={{ array: [...jobs], detailIndex }}
          data={jobs}
          refreshing={false}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => <JobItem 
            item={item} 
            categoryKey={categoryKey}
            onPressRow={() => this.onPressRow(index)} 
            doDeleteJob={doDeleteJob}
            detailIndex={detailIndex}
            index={index}
          />}
          onRefresh={this.onRefresh}
          onEndReached={this.onLoadMore}
          onEndReachedThreshold={0.3}          
        />
      </View>
    )
  }
}
const mapStateToProps = ({ homeStore: { jobContainer } }) => ({ jobContainer })

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    doDeleteJob: deleteJob
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  header: {
    fontSize: 25
  },
  jobItem: {
    padding: 15,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row'
  },
  image: {
    width: 32,
    height: 32,
  },
  data: {
    marginLeft: 10,
    flex: 1,
  },
  dataTitle: {
    fontWeight: 'bold'
  },
  dataDescription: {
    color: 'grey'
  },
  detailItem: {
    height: rowHeight,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#FFF',
    flexDirection: 'row'
  }
})
