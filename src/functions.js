const generator = require('generate-maze')

// Cria os muros no labirinto
function buildWalls(maze) {

  for (i = 0; i < maze.length - 1; i++) {
    maze.map((row, r) => {
      maze[r].map((col, c) => {
        if (c === i) {
          col.borders.right = true
          maze[r][c + 1].borders.left = true
        }
        if (r === i) {
          col.borders.bottom = true
          maze[r + 1][c].borders.top = true
        }
      })
    })
  }
}

// Gera uma câmara que só tem muros/bordas externas
function createMazeWithoutWalls(rows, columns) {
  
  return Array(rows).fill(0).map((_, row) => {
    return Array(columns).fill(0).map((_, column) => {
      let borders = {}
      borders.top = false
      borders.left = false
      borders.right = false
      borders.bottom = false

      // define se a célula da posição atual terá bordas ou não
      if (row === 0) borders.top = true
      if (row === rows - 1) borders.bottom = true
      if (column === 0) borders.left = true
      if (column === columns - 1) borders.right = true

      return {
        borders
      }
    })
  })
}

function generateMaze(rows, columns) {
  const maze = generator(rows, columns)

  return maze
}

function putWeed(maze, y, x) {
  maze[y][x].weed = true
}

function putPatrick(maze, y, x) {
  maze[y][x].patrick = true
}

function removePatrick(maze, y, x) {
  maze[y][x].patrick = false
}

export { createMazeWithoutWalls, buildWalls, generateMaze, putWeed, putPatrick, removePatrick }