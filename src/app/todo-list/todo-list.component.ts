import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { TodoListService } from "../todo-list.service";
import { animate, style, transition, trigger } from "@angular/animations";
import { DogGeneratorComponent } from "../dog-generator/dog-generator.component";

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [TodoItemComponent, ReactiveFormsModule, DogGeneratorComponent],
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.css",
  animations: [
    trigger("addAndRemoveTodoAnimation", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("250ms ease-in-out", style({ opacity: 1 })),
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("250ms ease-in-out", style({ opacity: 0 })),
      ]),
    ]),
  ],
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
