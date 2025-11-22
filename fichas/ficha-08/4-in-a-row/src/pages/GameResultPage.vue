<script>
import { Game } from "../models/game.js";

export default {
  props: ["id"],
  data() {
    return {
      game: new Game(),
    };
  },
  methods: {
    async getGame() {
      try {
        const response = await fetch(`http://localhost:3000/games/${this.id}`);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();
        this.game = new Game();
        this.game.board = data.game.board;
        this.game.isOver = data.game.isOver;
        this.game.winner = data.game.winner;
        this.game.player = data.game.player;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getGame();
  },
};
</script>

<template>
  <game-board :game="game"></game-board>
</template>
