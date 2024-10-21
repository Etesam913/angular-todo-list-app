import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { TodoListService } from "../todo-list.service";

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [TodoItemComponent, ReactiveFormsModule],
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.css",
})
export class TodoListComponent {
  todoListService = inject(TodoListService);

  newTodoForm = new FormGroup({
    todoTitle: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
    ]),
    todoDescription: new FormControl(""),
  });

  handleNewTodoSubmit() {
    if (
      this.newTodoForm.status === "VALID" &&
      this.newTodoForm.value.todoTitle &&
      this.newTodoForm.value.todoDescription
    ) {
      const newId = crypto.randomUUID();
      this.todoListService.addTodo({
        id: newId,
        title: this.newTodoForm.value.todoTitle,
        description: this.newTodoForm.value.todoDescription,
        checked: false,
      });
      this.newTodoForm.reset();
    }
  }
}
