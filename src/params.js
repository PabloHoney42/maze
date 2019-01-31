import { Dimensions } from 'react-native'

const params = {
  cellSize: 30,
  borderSize: 2,
  headerRatio: 0.30, // proporção do painel superior

  getColumnsAmount() {
    const screenWidth = Dimensions.get('window').width
    return Math.floor(screenWidth / this.cellSize)
  },

  getRowsAmount() {
    const screenHeight = Dimensions.get('window').height
    const mazeHeight = screenHeight * (1 - this.headerRatio)
    return Math.floor(mazeHeight / this.cellSize)
  }
}

export default params