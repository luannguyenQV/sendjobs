import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const AddCarProperty = props => <TextInput style={styles.container} {...props} />

export default AddCarProperty

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    backgroundColor: '#f8f8f8',
    padding: 15,
    paddingVertical: 13,
  },
})
