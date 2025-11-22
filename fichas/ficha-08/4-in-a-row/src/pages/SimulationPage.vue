<script>
import { Game } from "../models/game";

export default {
  data() {
    return {
      game: new Game(),
      running: false,
      simulation: {},
    };
  },
  methods: {
    play(column) {
      this.game.play(column);
    },
    simulate() {
      this.running = true;
      let index = 0;

      let intervalId = setInterval(() => {
        this.play(this.simulation.plays[index]);
        index++;

        // 4. Quando terminarem as jogadas, parar o setInterval
        if (index >= this.simulation.plays.length) {
          clearInterval(intervalId);
          this.running = false;
        }
      }, 1000);

      this.running = false;
    },
    async getSimulation() {
      try {
        const response = await fetch("http://localhost:3000/simulation/1");

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        this.simulation = await response.json();
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getSimulation();
  },
};
</script>

<template>
  <div class="title">Simulate Last Game</div>
  <game-board :game="game"></game-board>
  <div class="button-container">
    <button-component @click="simulate" :disabled="running"
      >Simulate</button-component
    >
  </div>
</template>

<style scoped>
.title {
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
