class Game {
  /**
   * @params first [black]:黑棋先手 [white]:白棋先手
   *  */
  constructor(...args) {
    this.init(...args)
  }
  // 初始化游戏
  init({
    first = 'black',
    gamestart = false,
    gameover = false,
    winner = ''
  } = {}) {
    // 棋盘
    this.chessboard = Game.getChessboard()
    // 先手方
    this.first = first
    // 游戏开始
    this.gamestart = gamestart
    // 游戏结束
    this.gameover = gameover
    // 胜利者
    this.winner = winner
    // 下棋历史
  }
  static getChessboard() {
    const rows = Array(15)
    for(let i=0, len=rows.length; i<len; i++) {
      rows[i] = Array.apply(null, Array(15)).map(() => this.initBox())
    }
    return rows
  }
  static initBox() {
    return ''
  }
  // 设置先手方
  setFirst(player) {
    if (this.gamestart) {
      return false
    }
    this.first = player
    return true
  }
  // 开始下棋
  onStep(rowIdx, colIdx) {
    if (this.gameover) {
      return false
    }
    // // 开始下棋后设定游戏开始
    if (!this.gamestart) {
      this.gamestart = true
    }
    if (this.chessboard[rowIdx][colIdx]) {
      return false
    }
    switch(this.first) {
      case 'black': {
        this.chessboard[rowIdx].splice(colIdx, 1, '〇')
        break
      }
      case 'white': {
        this.chessboard[rowIdx].splice(colIdx, 1, 'X')
      }
    }
    this.checkWinner()
    this.changePlayer()
    return true
  }
  // 切换下棋方
  changePlayer() {
    this.first = this.first === 'black' ? 'white' : 'black'
  }
  // 获胜判断
  checkWinner() {
    let winner = ''
    // 第一步，判断横向是否赢棋
    winner = this.checkRowWin(this.chessboard)
    if (winner) {
      this.winner = winner
      this.gameover = true
      return
    }
    // 第二步，判断纵向是否赢棋
    winner = this.checkColWin(this.chessboard)
    if (winner) {
      this.winner = winner
      this.gameover = true
      return
    }
    // 第三步，判断对角线是否赢棋
    // 3.1 正斜线
    winner = this.checkSlashWin(this.chessboard)
    if (winner) {
      this.winner = winner
      this.gameover = true
      return
    }
    // 3.2 反斜线
    winner = this.checkBackslashWin(this.chessboard)
    if (winner) {
      this.winner = winner
      this.gameover = true
      return
    }
  }
  checkRowWin(chessboard) {
    let winner = ''
    for(let i=0,len=chessboard.length; i<len; i++) {
      const str = chessboard[i].join('_')
      winner = str.match('〇_〇_〇_〇_〇') ? 'black' : str.match('X_X_X_X_X') ? 'white' : ''
      if (winner) {
        break
      }
    }
    return winner
  }
  checkColWin(chessboard) {
    // 获取逆转矩阵
    const T = Game.getChessboard()
    for(let i=0,row=chessboard.length; i<row; i++) {
      for(let j=0, col=chessboard[i].length; j<col; j++) {
        T[j][i] = chessboard[i][j]
      }
    }
    return this.checkRowWin(T)
  }
  checkSlashWin(chessboard) {
    // 获取正斜线可能胜利的数组
    // 从[0, 4]到[4, 0]，[0, 5]到[5, 0]，以此内推，[10, 14]到[14, 10]
    const slash = Array.apply(null, Array(21)).map(() => [])
    for(let i=0, row=chessboard.length; i<row; i++) {
      let col = chessboard[i].length
      let j = 4 - i > 0 ? 4 - i : 0
      let len = i - 10 < 0 ? col : col - (i - 10)
      let k = i - 4 < 0 ? 0 : i - 4
      for(; j<len; j++, k++) {
        slash[k][i] = chessboard[i][j]
      }
    }
    return this.checkRowWin(slash)
  }
  checkBackslashWin(chessboard) {
    // 获取反斜线可能胜利的数组
    // 从[0, 10]到[4, 14]，[0, 9]到[5, 14]，以此内推，[10, 0]到[14, 4]
    const backslash = Array.apply(null, Array(21)).map(() => [])
    for(let i=0, row=chessboard.length; i<row; i++) {
      let col = chessboard[i].length
      let j = 4 - i > 0 ? col - (4 - i) - 1 : col - 1
      let len = i - 10 < 0 ? 0 : i - 10
      let k = i - 4 < 0 ? 0 : i - 4
      for(; j>=len; j--, k++) {
        backslash[k][i] = chessboard[i][j]
      }
    }
    return this.checkRowWin(backslash)
  }
  // 悔棋
  regretStep() {
    // TODO
    return true
  }
}

export default Game