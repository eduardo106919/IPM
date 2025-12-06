<script>
import { Game } from "../models/game.js";

export default {
  props: ['id'],
  data() {
    return {
      game: new Game()
    };
  },
  methods: {
    async getGame() {
      try {
        const response = await fetch('http://localhost:3000/games/' + this.id);

        if (!response.ok) {
          this.$router.push("/notFound");
          return;
        }

        const data = await response.json();
        this.game.board = data.game.board;
        this.game.player = data.player;
        this.game.winner = data.winner;
        this.game.isOver = data.isOver;
      } catch(error) {
        console.log(error);
      }
    }
  },
  created() {
    this.getGame();
  }
}
</script>

<template>
  <game-board :game="game"></game-board>
</template>