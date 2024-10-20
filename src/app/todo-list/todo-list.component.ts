import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
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
  imports: [TodoItemComponent, ReactiveFormsModule],
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

  newTodoForm = new FormGroup({
    todoTitle: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
    ]),
    todoDescription: new FormControl(""),
  });

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
    console.log({ remainingTodos });
    this.todos = remainingTodos;
  }

  handleNewTodoSubmit() {
    if (
      this.newTodoForm.status === "VALID" &&
      this.newTodoForm.value.todoTitle &&
      this.newTodoForm.value.todoDescription
    ) {
      const newId = crypto.randomUUID();
      this.todos.push({
        id: newId,
        title: this.newTodoForm.value.todoTitle,
        description: this.newTodoForm.value.todoDescription,
        checked: false,
      });
      this.newTodoForm.reset();
    }
  }
}
