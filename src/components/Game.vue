<template>
  <div>
    <div>winner is: {{ winner }}</div>
    <div v-for="(row, rIdx) in gameData.chessboard" :key="rIdx" class="chess-board">
      <div v-for="(col, cIdx) in row" :key="cIdx" class="chess-board-item" @click="onStep(rIdx, cIdx)">
        {{ col }}
      </div>
    </div>
    <div v-if="gameData.gameover">游戏结束</div>
    <button @click="restartGame">重新开始</button>
  </div>
</template>
<script>
import gameDomain from '@/domains/game'
const gameData = new gameDomain()
export default {
  data() {
    return {
      gameData
    }
  },
  computed: {
    winner() {
      if (!gameData.winner) {
        return ''
      }
      return gameData.winner === 'black' ? '〇' : 'X'
    }
  },
  methods: {
    onStep(rIdx, cIdx) {
      gameData.onStep(rIdx, cIdx)
    },
    restartGame() {
      gameData.init()
    }
  }
}
</script>
<style scoped>
  .chess-board {
    display: flex;
  }
  .chess-board-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 1px solid #9b9b9b;
    cursor: pointer;
  }
</style>
