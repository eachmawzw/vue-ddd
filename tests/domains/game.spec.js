import gameDomain from '@/domains/game'

describe('Game domain test', () => {
  // 测试静态方法
  it('获取一个棋盘，棋盘规格15✖15', () => {
    const chessboard = gameDomain.getChessboard()
    const row = chessboard.length
    const col = chessboard[0].length
    expect(row).toBe(15)
    expect(col).toBe(15)
  })

  it('初始化一个棋盘格子', () => {
    expect(gameDomain.initBox()).toBe('')
  })

  // 测试下棋
  const game = new gameDomain({ first: 'black' })
  let chessboard = game.chessboard
  it('开始下棋', () => {
    expect(game.onStep(0, 0)).toBe(true)
    expect(chessboard[0][0]).toBe('〇')
    expect(game.onStep(1, 0)).toBe(true)
    expect(chessboard[1][0]).toBe('X')
    
    // 已经下过的棋不允许再下
    expect(game.onStep(0, 0)).toBe(false)
  })

  it('获取游戏胜利者', () => {
    expect(game.winner).toBe('')
  })

  it('模拟下棋并赢得比赛（横向）', () => {
    expect(game.onStep(0, 1)).toBe(true)
    expect(chessboard[0][1]).toBe('〇')
    expect(game.onStep(1, 1)).toBe(true)
    expect(chessboard[1][1]).toBe('X')
    expect(game.onStep(0, 2)).toBe(true)
    expect(chessboard[0][2]).toBe('〇')
    expect(game.onStep(1, 2)).toBe(true)
    expect(chessboard[1][2]).toBe('X')
    expect(game.onStep(0, 3)).toBe(true)
    expect(chessboard[0][3]).toBe('〇')
    expect(game.onStep(1, 3)).toBe(true)
    expect(chessboard[1][3]).toBe('X')
    expect(game.onStep(0, 4)).toBe(true)
    expect(chessboard[0][4]).toBe('〇')
    expect(game.winner).toBe('black')
    expect(game.gameover).toBe(true)
    // 游戏结束不可再下
    expect(game.onStep(1, 4)).toBe(false)
    expect(chessboard[1][4]).toBe('')
  })

  it('初始化游戏', () => {
    game.init({first: 'white'})
    chessboard = game.chessboard
    expect(game.winner).toBe('')
    expect(game.gameover).toBe(false)
    expect(game.chessboard[0][0]).toBe('')
  })

  it('模拟下棋并赢得比赛（纵向）', () => {
    expect(game.onStep(0, 0)).toBe(true)
    expect(chessboard[0][0]).toBe('X')
    expect(game.onStep(0, 1)).toBe(true)
    expect(chessboard[0][1]).toBe('〇')
    expect(game.onStep(1, 0)).toBe(true)
    expect(chessboard[1][0]).toBe('X')
    expect(game.onStep(1, 1)).toBe(true)
    expect(chessboard[1][1]).toBe('〇')
    expect(game.onStep(2, 0)).toBe(true)
    expect(chessboard[2][0]).toBe('X')
    expect(game.onStep(2, 1)).toBe(true)
    expect(chessboard[2][1]).toBe('〇')
    expect(game.onStep(3, 0)).toBe(true)
    expect(chessboard[3][0]).toBe('X')
    expect(game.onStep(3, 1)).toBe(true)
    expect(chessboard[3][1]).toBe('〇')
    expect(game.onStep(4, 0)).toBe(true)
    expect(chessboard[4][0]).toBe('X')
    expect(game.winner).toBe('white')
    expect(game.gameover).toBe(true)
  })

  it('初始化游戏', () => {
    game.init({first: 'white'})
    chessboard = game.chessboard
    expect(game.winner).toBe('')
    expect(game.gameover).toBe(false)
    expect(game.chessboard[0][0]).toBe('')
  })

  it('模拟下棋并赢得比赛（对角线：正斜线）', () => {
    expect(game.onStep(0, 4)).toBe(true)
    expect(chessboard[0][4]).toBe('X')
    expect(game.onStep(0, 5)).toBe(true)
    expect(chessboard[0][5]).toBe('〇')
    expect(game.onStep(1, 3)).toBe(true)
    expect(chessboard[1][3]).toBe('X')
    expect(game.onStep(1, 4)).toBe(true)
    expect(chessboard[1][4]).toBe('〇')
    expect(game.onStep(2, 2)).toBe(true)
    expect(chessboard[2][2]).toBe('X')
    expect(game.onStep(2, 3)).toBe(true)
    expect(chessboard[2][3]).toBe('〇')
    expect(game.onStep(3, 1)).toBe(true)
    expect(chessboard[3][1]).toBe('X')
    expect(game.onStep(3, 2)).toBe(true)
    expect(chessboard[3][2]).toBe('〇')
    expect(game.onStep(4, 0)).toBe(true)
    expect(chessboard[4][0]).toBe('X')
    expect(game.winner).toBe('white')
    expect(game.gameover).toBe(true)
  })

  it('初始化游戏', () => {
    game.init({first: 'white'})
    chessboard = game.chessboard
    expect(game.winner).toBe('')
    expect(game.gameover).toBe(false)
    expect(game.chessboard[0][0]).toBe('')
  })

  it('模拟下棋并赢得比赛（对角线：反斜线）', () => {
    expect(game.onStep(0, 10)).toBe(true)
    expect(chessboard[0][10]).toBe('X')
    expect(game.onStep(0, 9)).toBe(true)
    expect(chessboard[0][9]).toBe('〇')
    expect(game.onStep(1, 11)).toBe(true)
    expect(chessboard[1][11]).toBe('X')
    expect(game.onStep(1, 10)).toBe(true)
    expect(chessboard[1][10]).toBe('〇')
    expect(game.onStep(2, 12)).toBe(true)
    expect(chessboard[2][12]).toBe('X')
    expect(game.onStep(2, 11)).toBe(true)
    expect(chessboard[2][11]).toBe('〇')
    expect(game.onStep(3, 13)).toBe(true)
    expect(chessboard[3][13]).toBe('X')
    expect(game.onStep(3, 12)).toBe(true)
    expect(chessboard[3][12]).toBe('〇')
    expect(game.onStep(4, 14)).toBe(true)
    expect(chessboard[4][14]).toBe('X')
    expect(game.winner).toBe('white')
    expect(game.gameover).toBe(true)
  })

  it('悔棋', () => {
    expect(game.regretStep()).toBe(true)
  })
})