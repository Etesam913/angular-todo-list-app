import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Subscription } from "rxjs";
import { RouterLink } from "@angular/router";
import { TodoItemExpandedComponent } from "../todo-item-expanded/todo-item-expanded.component";
import { TodoItem, TodoListService } from "../todo-list.service";

@Component({
  selector: "app-todo-item",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TodoItemExpandedComponent],
  templateUrl: "./todo-item.component.html",
  styleUrl: "./todo-item.component.css",
})
export class TodoItemComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() todo!: TodoItem;
  @ViewChild("editInput") editInput!: ElementRef;
  private todoListService = inject(TodoListService);

  isChecked = new FormControl(false);
  title = new FormControl("");
  private isCheckedSubscription: Subscription | undefined;

  isEditing = false;

  ngOnInit(): void {
    this.isChecked.setValue(this.todo.checked);
    this.title.setValue(this.todo.title);

    this.isCheckedSubscription = this.isChecked.valueChanges.subscribe(
      (newChecked) => {
        if (newChecked !== null) {
          this.todo.checked = newChecked;
          // this.updateTodoEvent.emit(this.todo);
          this.todoListService.updateTodo(this.todo);
        }
      },
    );
  }

  ngAfterViewChecked(): void {
    if (this.isEditing && this.editInput) {
      this.editInput.nativeElement.focus();
    }
  }

  // Unsubscribe from the subscription
  ngOnDestroy(): void {
    if (this.isCheckedSubscription) {
      this.isCheckedSubscription.unsubscribe();
    }
  }

  onTitleDoubleClick() {
    this.isEditing = true;
  }

  onDelete() {
    this.todoListService.deleteTodo(this.todo);
  }

  stopEditing() {
    this.isEditing = false;
    if (this.title.value) {
      this.todo.title = this.title.value;
    }
  }
}
