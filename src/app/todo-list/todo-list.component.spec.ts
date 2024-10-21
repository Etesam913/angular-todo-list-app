import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TodoListComponent } from "./todo-list.component";
import { provideRouter } from "@angular/router";

describe("TodoListComponent", () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create todolist", () => {
    expect(component).toBeTruthy();
  });

  it("should have todos", () => {
    const todoListContainer: HTMLElement = fixture.nativeElement;
    const todoItems = todoListContainer.querySelectorAll(".todo-item");
    expect(todoItems.length === 2);
  });
});
