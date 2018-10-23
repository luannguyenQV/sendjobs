import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { EvilIcons } from '@expo/vector-icons'

const AddCarCover = (props = {}) => {
  const { image, pickImage } = props
  return (
    <View style={styles.wrapperImage}>
      <Image
        style={{ flex: 1 }}
        source={image.url ? { uri: image.url } : null}
        resizeMode="stretch"
      />
      <TouchableOpacity style={styles.btnEditCover} onPress={pickImage}>
        <EvilIcons name="pencil" size={28} color="white" />
      </TouchableOpacity>
    </View>
  )
}

AddCarCover.propTypes = {
  image: PropTypes.string.isRequired,
  pickImage: PropTypes.func.isRequired,
}

export default AddCarCover

const styles = StyleSheet.create({
  wrapperImage: {
    borderRadius: 12,
    backgroundColor: '#eeeeee',
    height: 150,
    position: 'relative',
    overflow: 'hidden',
  },
  btnEditCover: {
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ffffff',
    width: 55,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
})
