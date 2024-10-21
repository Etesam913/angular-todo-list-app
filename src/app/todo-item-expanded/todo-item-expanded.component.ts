import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { TodoItem, TodoListService } from "../todo-list.service";

@Component({
  selector: "app-todo-item-expanded",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./todo-item-expanded.component.html",
  styleUrl: "./todo-item-expanded.component.css",
})
export class TodoItemExpandedComponent implements AfterViewInit, OnInit {
  @Input() id!: string;
  @ViewChild("dialogElement") dialogElement!: ElementRef;
  todoListService = inject(TodoListService);
  todo: TodoItem | undefined;

  ngOnInit(): void {
    this.todo = this.todoListService.getTodoById(this.id);
  }

  ngAfterViewInit(): void {
    if (this.dialogElement) {
      const dialogElement = this.dialogElement
        .nativeElement as HTMLDialogElement;
      if (dialogElement) {
        dialogElement.showModal();
      }
    }
  }
}
