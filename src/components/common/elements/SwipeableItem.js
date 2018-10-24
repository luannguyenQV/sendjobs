import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'
import Interactable from 'react-native-interactable'

const DAMPING = 1 - 0.6
const TENSION = 300

export default class SwipeableItem extends PureComponent {
  constructor (props) {
    super(props)
    this._deltaX = new Animated.Value(0)
    this.state = {
      isMoving: false,
      position: 1
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <Interactable.View
          ref={el => (this.interactableElem = el)}
          horizontalOnly
          snapPoints={[
            {
              x: 0,
              damping: 1 - DAMPING,
              tension: TENSION
            },
            {
              x: 0,
              damping: 1 - DAMPING,
              tension: TENSION
            }
          ]}
          dragEnabled={!this.props.disabled}
          onSnap={this.onSnap}
          onDrag={this.onDrag}
          onStop={this.onStopMoving}
          dragToss={0.01}
          animatedValueX={this._deltaX}
          boundaries={{ left: -200, right: 200, bounce: 0 }}
        >
          <TouchableHighlight
            onPress={this.onRowPress}
            underlayColor={'#dddddd'}
          >
            <View
              style={{
                left: 0,
                right: 0
              }}
            >
              {this.props.children}
            </View>
          </TouchableHighlight>
        </Interactable.View>
      </View>
    )
  }
  onSnap = ({ nativeEvent }) => {
    const { index } = nativeEvent
    this.setState({ position: index })
  }
  onRowPress = () => {
    const { isMoving, position } = this.state
    if (!isMoving && position !== 1) {
      this.interactableElem.snapTo({ index: 1 })
    }
  }
  onDrag = ({ nativeEvent }) => {
    const { deleteItem } = this.props
    const { state, x } = nativeEvent
    if (state === 'start') {
      this.setState({ isMoving: true })
    }
    if (x > 150 || x < -150) {
      deleteItem()
    }
  }
  onStopMoving = () => {
    this.setState({ isMoving: false })
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  button: {
    width: 48,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonImage: {
    width: 25,
    height: 24
  },
  menu: {
    position: 'absolute',
    right: 16,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  }
})
