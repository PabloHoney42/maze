import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

import Patrick from './Patrick'
import params from '../params'

export default (props) => {
  const cellStyles = [styles.cell]
  if (props.top) cellStyles.push(styles.topBordered)
  if (props.bottom) cellStyles.push(styles.bottomBordered)
  if (props.left) cellStyles.push(styles.leftBordered)
  if (props.right) cellStyles.push(styles.rightBordered)

  return (
    <View style={cellStyles}>
      {props.weed ? <Image source={require('../marijuana.png')} /> : false}
      {props.patrick ? <Patrick /> : false}
    </View>
  )
}

const styles = StyleSheet.create({
  cell: {
    width: params.cellSize,
    height: params.cellSize,    
    backgroundColor: '#FFFFFF',
  },
  topBordered: {
    borderTopWidth: params.borderSize,
    borderTopColor: '#000000',
  },
  bottomBordered: {
    borderBottomWidth: params.borderSize,
    borderBottomColor: '#000000',
  },
  leftBordered: {
    borderLeftWidth: params.borderSize,
    borderLeftColor: '#000000',
  },
  rightBordered: {
    borderRightWidth: params.borderSize,
    borderRightColor: '#000000',
  }
})