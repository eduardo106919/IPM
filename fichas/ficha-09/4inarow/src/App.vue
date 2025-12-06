<!-- Este documento apresenta uma solução em construção. É fornecido como 
     material de estudo. Recomenda-se que o revejam e melhorem conforme   
     forem adquirindo novos conhecimentos. -->

<script>
import { Toast } from "primevue";
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar,
    // TODO: registar Toast
    Toast,
  },
  data() {
    return {
      player: false,
      winner: null,
    };
  },
  methods: {
    changePlayer(player) {
      this.player = player;
    },
    changeWinner(winner) {
      this.winner = winner;
    },
    reset(player) {
      this.player = player;
      this.winner = null;
    },
    showError() {
      const toast = useToast();
      toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
    }
  },
};
</script>

<template>
  <!-- TODO: inserir o componente <Toast /> -->
  <Toast></Toast>
  <nav-bar></nav-bar>
  <router-view></router-view>
</template>
