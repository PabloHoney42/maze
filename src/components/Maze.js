import React from 'react'
import { View, StyleSheet } from 'react-native'

import Cell from './Cell'

export default props => {
  const { maze } = props

  return (
    <View style={styles.maze}>
      {maze.map((row, r) => {

        const columns = row.map((column, c) => {
          return <Cell {...column} key={c} />
        })

        return (
          <View style={styles.mazeRow} key={r}>
            {columns}
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  maze: {
    // flexDirection: 'row',
  },
  mazeRow: {
    flexDirection: 'row'
  }
})