import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { TodoItem } from "../todo-list/todo-list.component";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-todo-item",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./todo-item.component.html",
  styleUrl: "./todo-item.component.css",
})
export class TodoItemComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() todo!: TodoItem;
  @Output() updateTodoEvent = new EventEmitter<TodoItem>();
  @Output() deleteTodoEvent = new EventEmitter<TodoItem>();
  @ViewChild("editInput") editInput!: ElementRef;

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
          this.updateTodoEvent.emit(this.todo);
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
    this.deleteTodoEvent.emit(this.todo);
  }

  stopEditing() {
    this.isEditing = false;
    if (this.title.value) {
      this.todo.title = this.title.value;
    }
  }
}
