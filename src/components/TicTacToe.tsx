'use client'

import { useState } from 'react'

type Player = 'X' | 'O' | null
type Board = Player[]

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState<Player>(null)

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ]

  const checkWinner = (newBoard: Board): Player => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a]
      }
    }
    return null
  }

  const isBoardFull = (board: Board): boolean => {
    return board.every(cell => cell !== null)
  }

  const handleCellClick = (index: number) => {
    if (board[index] || gameOver) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
      setGameOver(true)
    } else if (isBoardFull(newBoard)) {
      setGameOver(true)
      setWinner(null) // It's a tie
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setGameOver(false)
    setWinner(null)
  }

  const getStatusMessage = () => {
    if (winner) {
      return `🎉 Player ${winner} WINS! 🎉`
    } else if (gameOver) {
      return "🤝 IT'S A TIE! 🤝"
    } else {
      return `Player ${currentPlayer}'s Turn`
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 p-8">
      <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 rounded-none">
        <h1 className="text-6xl font-black text-center mb-8 text-black transform -rotate-2 bg-yellow-400 border-4 border-black px-6 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          TIC TAC TOE
        </h1>
        
        <div className="text-center mb-6">
          <div className={`text-3xl font-black px-6 py-3 border-4 border-black inline-block transform rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
            winner === 'X' ? 'bg-green-400' : 
            winner === 'O' ? 'bg-green-400' : 
            gameOver ? 'bg-orange-400' :
            currentPlayer === 'X' ? 'bg-blue-400' : 'bg-red-400'
          }`}>
            {getStatusMessage()}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8 w-fit mx-auto">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              className={`w-24 h-24 border-6 border-black text-4xl font-black transition-all duration-150 transform hover:scale-105 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:scale-95 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                cell === 'X' ? 'bg-blue-400 text-white' : 
                cell === 'O' ? 'bg-red-400 text-white' : 
                'bg-white hover:bg-gray-100'
              } ${!cell && !gameOver ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              disabled={!!cell || gameOver}
            >
              {cell && (
                <span className={`${cell === 'X' ? 'text-white' : 'text-white'} drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]`}>
                  {cell}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={resetGame}
            className="bg-green-400 hover:bg-green-500 text-black text-2xl font-black px-8 py-4 border-4 border-black transform hover:scale-105 transition-all duration-150 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:scale-95 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -rotate-1"
          >
            🔄 NEW GAME
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <div className="bg-black text-white text-lg font-black px-6 py-3 border-4 border-white transform rotate-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          NEO BRUTAL THEME ⚡
        </div>
      </div>
    </div>
  )
}

export default TicTacToe