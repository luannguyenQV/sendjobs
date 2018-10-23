import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'

const CategoryItem = ({item, onPress}) => (
  <TouchableOpacity
    onPress={() => onPress(item.key, item.name)}
  >
    <View style={styles.categoryItem}>
      <Text>{item.name}</Text>
    </View>
  </TouchableOpacity>
)

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation, props }) => ({
    title: 'Categories',
    headerTintColor: '#2f2a2a'
  })

  onRefresh = () => {}

  onLoadMore = () => {}

  onPressCategory = (key, name) => {
    const { navigation } = this.props

    navigation.navigate('JobScreen', { key, name })
  }

  render() {
    const { navigation, categories } = this.props

    return (
      <View style={styles.container}>
        <FlatList 
          data={categories}
          refreshing={false}
          keyExtractor={(item, index) => item.key}
          renderItem={({item}) => <CategoryItem item={item} onPress={this.onPressCategory} />}
          onRefresh={this.onRefresh}
          onEndReached={this.onLoadMore}
          onEndReachedThreshold={0.3}          
        />
      </View>
    )
  }
}

const mapStateToProps = ({ homeStore: { categories } }) => ({ categories })

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  categoryItem: {
    padding: 15,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#FFF',
    borderRadius: 4,
  }
})
