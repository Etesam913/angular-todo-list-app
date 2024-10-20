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
  viewChild,
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
  @ViewChild("editInput") editInput!: ElementRef;

  isChecked = new FormControl(false);
  private isCheckedSubscription: Subscription | undefined;

  isEditing = false;

  ngOnInit(): void {
    this.isChecked.setValue(this.todo.checked);
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

  stopEditing() {
    this.isEditing = false;
  }
}
