
const game = Vue.createApp({
    data() {
        return {
            board: ["", "", "", "", "", "", "", "", ""],
            players: ["X", "O"],
            current: 0,
            winner: ""
        }
    },

    methods: {
        selectCell(index) {
            if (this.winner == "") {
                if (this.board[index] == "") {
                    this.board[index] = this.players[this.current];
                    this.current = (this.current + 1) % this.players.length;

                    res = this.checkGameStatus();
                    console.log("game status: " + res);
                    switch (res) {
                        case 1:
                            this.winner = "TIE";
                            break;
                        case 2:
                            this.winner = "The winner is X.";
                            break;
                        case 3:
                            this.winner = "The winner is O.";
                            break;
                        default:
                            break;
                    }
                } else
                    window.alert("Cell already selected!!!");
            } else {
                this.winner = "The game already finished, press Reset.";
            }
        },

        checkGameStatus() {
            const winningCombos = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            for (const [a, b, c] of winningCombos) {
                if (
                    this.board[a] &&
                    this.board[a] === this.board[b] &&
                    this.board[a] === this.board[c]
                ) {
                    // winner is X or O
                    return this.board[a] == 'X' ? 2 : 3;
                }
            }

            // game is tied
            if (this.board.every(cell => cell))
                return 1;

            // still in progress
            return 0;
        },

        resetGame() {
            for (let index = 0; index < this.board.length; index++) {
                this.board[index] = "";
            }
            this.winner = "";
            this.current = 0;
        }

    },
});


game.mount("#game")

