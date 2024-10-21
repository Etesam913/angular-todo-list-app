import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TodoItemComponent } from "./todo-item.component";
import { provideRouter } from "@angular/router";

describe("TodoItemComponent", () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = {
      id: "test",
      checked: false,
      title: "test todo",
      description: "test todo description",
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
