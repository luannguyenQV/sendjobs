import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'

const REGEX_FIRST_SENTENCE = /(^.*?[a-z]{2,}[.!?])\s+\W*[A-Z]/

function getFirstSentence(data) {
  let arr = REGEX_FIRST_SENTENCE.exec(data);
  return arr[1]; 
}

const JobItem = ({ item }) => (
  <TouchableOpacity
    onPress={() => onPress(item.key, item.name)}
  >
    <View style={styles.jobItem}>
      <Image
        style={styles.image}
        source={{uri: item.image}}
      />      
      <View style={styles.data}>
        <Text style={styles.dataTitle}>{item.title}</Text>
        <Text style={styles.dataDescription}>{getFirstSentence(item.description)}</Text>
      </View>
    </View>
  </TouchableOpacity>
)

class JobScreen extends React.Component {
  static navigationOptions = ({ navigation, props }) => ({
    title: 'Job detail',
    headerTintColor: '#2f2a2a',
  })

  onRefresh = () => {}

  onLoadMore = () => {}

  onPressCategory = () => {

  }

  render() {
    const { navigation, jobContainer } = this.props
    const categoryKey = navigation.getParam('key', null)
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
          data={jobs}
          refreshing={false}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => <JobItem item={item} onPress={this.onPressCategory} />}
          onRefresh={this.onRefresh}
          onEndReached={this.onLoadMore}
          onEndReachedThreshold={0.3}          
        />
      </View>
    )
  }
}
const mapStateToProps = ({ homeStore: { jobContainer } }) => ({ jobContainer })

const mapDispatchToProps = dispatch => ({})

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
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
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
  }
})
