import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import _ from 'lodash'

import params from './src/params'
import patrickFunctions, { sortearDireção } from './src/patrickFunctions'
import { generateMaze, putWeed, putPatrick, removePatrick } from './src/functions'
import Maze from './src/components/Maze'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.updatePatrickPosition(), 100)
    this.setState({ title: 'Labirinto' })
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  createState() {
    const rows = params.getRowsAmount()
    const columns = params.getColumnsAmount()
    //let maze = createMazeWithoutWalls(6, 6)
    //buildWalls(maze)
    let maze = generateMaze(columns, rows)
    putWeed(maze, 0, 0)
    putPatrick(maze, rows - 1, columns - 1)

    return {
      maze,
      patrick: {
        x: columns - 1,
        y: rows - 1,
        moves: []
      },
      title: 'Aguarde...'
    }
  }

  chooseNextDirection(patrick, maze) {
    const actualCell = maze[patrick.y][patrick.x]

    // adicionando todas as direções possíveis para em seguida filtrar de acordo com as condições estabelecidas
    let availableDirections = []
    if (!actualCell.top) availableDirections.push('T')
    if (!actualCell.left) availableDirections.push('L')
    if (!actualCell.right) availableDirections.push('R')
    if (!actualCell.bottom) availableDirections.push('B')

    if (availableDirections.length > 1) {
      const moves = patrick.moves

      if (moves.length !== 0) {
        const prevPosition = moves[moves.length - 1]
        const prevDirections = maze[prevPosition.y][prevPosition.x].chosenDirections
        const prevDirection = prevDirections[prevDirections.length - 1]

        // remove do rol de direções disponíveis a direção contrária a tomada no ultimo movimento,a fim de não
        // retornar para o mesmo lugar
        if (prevDirection === 'T') _.remove(availableDirections, move => move === 'B')
        if (prevDirection === 'L') _.remove(availableDirections, move => move === 'R')
        if (prevDirection === 'R') _.remove(availableDirections, move => move === 'L')
        if (prevDirection === 'B') _.remove(availableDirections, move => move === 'T')
      }
      // if (availableDirections.length === 2) return availableDirections[0] // ações tomadas até aqui são suficientes se houverem apenas duas saídas disponíveis

      // "dir" de direção'. Remove da lista de direções disponíveis as direções que foram selecionadas em movimentos anteriores
      // que aconteceram a partir da célula atual
      // const chosen = actualCell.chosenDirections

      // if (chosen !== 'undefined' && chosen) {
      //   availableDirections = availableDirections.filter(d => !chosen.find(c => c === d))
      // }

      const index = parseInt(Math.random() * availableDirections.length)
      return availableDirections[index]
    } else {
      return availableDirections[0]
    }
  }

  updatePatrickPosition() {
    const maze = this.state.maze
    const patrick = this.state.patrick
    let actualCell = maze[patrick.y][patrick.x]
    const actualY = actualCell.y
    const actualX = actualCell.x
    const title = 'PROCURANDO...'

    // selecionando a nova direção
    const nextDir = this.chooseNextDirection(patrick, maze)

    // registrando a posição no array de registro de movimentos e nos dados do labirinto
    patrick.moves.push({
      y: actualY,
      x: actualX,
    })
    let chosen = actualCell.chosenDirections
    if (chosen !== 'undefined' && chosen) {
      actualCell.chosenDirections.push(nextDir)
    } else {
      actualCell.chosenDirections = [nextDir]
    }

    // selecionando as próximas coordenadas
    let newY = actualY, newX = actualX
    if (nextDir === 'T') newY = actualY - 1
    if (nextDir === 'R') newX = actualX + 1
    if (nextDir === 'L') newX = actualX - 1
    if (nextDir === 'B') newY = actualY + 1

    // redesenhando o patrick no labirinto com as novas coordenadas
    removePatrick(maze, actualY, actualX)
    putPatrick(maze, newY, newX)

    this.setState({
      maze,
      patrick: {
        x: newX,
        y: newY,
        moves: patrick.moves
      },
      title
    })

    if (actualX === 0 && actualY === 0) {
      this.setState({title: 'FIM!'})
      clearInterval(this.timerID)
    }

    // this.setState((prevState, props) => {
    //   let moves = prevState.patrick.moves
    //   moves.push({
    //     y: actualY,
    //     x: actualX,
    //   })

    //   return {
    //     maze,
    //     patrick: {
    //       x: newX,
    //       y: newY,
    //       moves
    //     }
    //   }
    // })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{this.state.title}</Text>
        <Text>
          By: Hilton M. Cardoso
        </Text>

        <Maze maze={this.state.maze} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
