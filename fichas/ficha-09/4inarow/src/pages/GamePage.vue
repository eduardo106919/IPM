<script>
import { Game } from "../models/game";
import { PlayResult } from "../models/playResult";
import { GameResult } from "../models/gameResult";
import { useSimulationStore } from "../stores/simulationStore";

export default {
  data() {
    return {
      game: new Game(),
      statistics: {}
    }
  },
  methods: {
    async getStatistics() {
      try {
        const response = await fetch('http://localhost:3000/statistics/1');

        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        this.statistics = await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    async updateStatistics() {
      const winner = this.game.winner;

      if (winner === GameResult.YELLOW) {
        this.statistics.yellow += 1;
      } else if (winner === GameResult.RED) {
        this.statistics.red += 1;
      } else {
        this.statistics.draw += 1;
      }

      await fetch('http://localhost:3000/statistics/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.statistics)
      });
    },
    async saveGame() {
      await fetch('http://localhost:3000/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: new Date().toISOString(),
          game: this.game
        })
      });
    },
    play(column) {

      // TODO: garantir que startPlayer é atualizado no início do jogo
      // se ainda não tivermos o startPlayer, guardamos quem começou
      const store = useSimulationStore();
      if (store.startPlayer == null)
        store.setStartPlayer(this.game.player);

      // TODO: registar a jogada na store da simulação
      store.addPlay(column);

      const res = this.game.play(column);

      // lidar com erros existentes (coluna cheia, jogo terminado, ...)
      if (res === PlayResult.ERROR_FULL_COLUMN) {
        alert('Column is full!');
      } else if (res === PlayResult.ERROR_GAME_OVER) {
        alert('Game over. Click "New Game" to play another game.')
      } else if (res === PlayResult.GAME_OVER) {
        this.updateStatistics();
        this.saveGame();
      }
    },
    reset() {
      this.game.reset();
      // TODO: reverter a store da simulação ao estado inicial
      // e atualizar startPlayer (o jogador inicial do novo jogo)
      const store = useSimulationStore();
      // reset de store é predefinido
      // store.startPlayer = this.game.player;
      // store.plays.length = 0;
      store.$reset();
    }
  },
  computed: {
    gameStatus() {
      const winner = this.game.winner;

      if (winner === GameResult.YELLOW) {
        return 'Winner: Yellow';
      }

      if (winner === GameResult.RED) {
        return 'Winner: Red';
      }

      if (winner === GameResult.DRAW) {
        return 'Draw';
      }

      return this.game.player
        ? 'Player: Red'
        : 'Player: Yellow'
    }
  },
  created() {
    this.getStatistics();
  }
}
</script>

<template>
  <div class="status">{{ gameStatus }}</div>
  <game-board :game="game" @play="play" />
  <div class="button-container">
    <button-component @click="reset">New Game</button-component>
  </div>
</template>

<style scoped>
.status {
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  margin: 40px 0;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>