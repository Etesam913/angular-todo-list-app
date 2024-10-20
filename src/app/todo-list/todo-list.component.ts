import { Component } from "@angular/core";
import { TodoItemComponent } from "../todo-item/todo-item.component";

export type TodoItem = {
  id: string;
  title: string;
  description: string;
  checked: boolean;
};

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [TodoItemComponent],
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.css",
})
export class TodoListComponent {
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

  updateTodo(updatedTodo: TodoItem) {
    const indexOfTodo = this.todos.findIndex(({ id }) => id === updatedTodo.id);
    if (indexOfTodo !== -1) {
      this.todos[indexOfTodo] = updatedTodo;
    }
  }
}
