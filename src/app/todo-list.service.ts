import { Injectable } from "@angular/core";

export type TodoItem = {
  id: string;
  title: string;
  description: string;
  checked: boolean;
};

@Injectable({
  providedIn: "root",
})
export class TodoListService {
  todos: TodoItem[] = [
    {
      id: "12ava",
      title: "this is a todo list title",
      description: "this is a todo list description",
      checked: false,
    },
    {
      id: "vvas#",
      title: "nice one dude",
      description: "this is cool",
      checked: true,
    },
  ];

  constructor() {}

  getTodos(): TodoItem[] {
    return this.todos;
  }

  updateTodo(updatedTodo: TodoItem) {
    const indexOfTodo = this.todos.findIndex(({ id }) => id === updatedTodo.id);
    if (indexOfTodo !== -1) {
      this.todos[indexOfTodo] = updatedTodo;
    }
  }

  deleteTodo(todoToDelete: TodoItem) {
    const indexOfTodo = this.todos.findIndex(
      ({ id }) => id === todoToDelete.id,
    );
    const remainingTodos = this.todos
      .slice(0, indexOfTodo)
      .concat(this.todos.slice(indexOfTodo + 1, this.todos.length));
    this.todos = remainingTodos;
  }

  addTodo(todoToAdd: TodoItem) {
    this.todos.push(todoToAdd);
  }
}
