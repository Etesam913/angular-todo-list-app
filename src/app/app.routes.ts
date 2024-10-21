import { Routes } from "@angular/router";
import { TodoItemExpandedComponent } from "./todo-item-expanded/todo-item-expanded.component";

export const routes: Routes = [
  {
    path: "todo/:id",
    component: TodoItemExpandedComponent,
  },
];
