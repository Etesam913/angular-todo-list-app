import { Component, Input } from "@angular/core";

@Component({
  selector: "app-todo-item-expanded",
  standalone: true,
  imports: [],
  templateUrl: "./todo-item-expanded.component.html",
  styleUrl: "./todo-item-expanded.component.css",
})
export class TodoItemExpandedComponent {
  @Input() id!: string;
}
