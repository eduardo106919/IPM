
const app = Vue.createApp({
  data() {
    return {
      todos: [
        'Learn a new course',
        'Read a book',
        'Go to the gym',
        'Go shopping'
      ],
      today: new Date().toLocaleDateString(),
      enteredTodo: ""
    }
  },

  methods: {
    // adds an item to the todos array
    submitTodo() {
      if (this.enteredTodo.trim() != "") {
        if (this.todos.includes(this.enteredTodo))
          window.alert(this.enteredTodo + " already exists!!!");
        else
          this.todos.push(this.enteredTodo);

        this.enteredTodo = "";
      }
    },

    // removes item from todos array
    deleteTodo(index) {
      this.todos.splice(index, 1);
    }

  },

  computed: {
    // checks if the input is empty
    isEmptyTodo() {
      return this.enteredTodo.trim() === "";
    }
  }

});

app.mount("#app")


