import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from "@angular/core/testing";

import { TodoListComponent } from "./todo-list.component";
import { provideRouter } from "@angular/router";

describe("TodoListComponent", () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [
        provideRouter([]),
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
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
    expect(todoItems.length).toBe(2);
  });

  it("should add a todo", async () => {
    const todoListContainer: HTMLElement = fixture.nativeElement;

    const titleInput: HTMLInputElement | null =
      todoListContainer.querySelector("#new-todo-title");

    if (!titleInput) {
      fail("title input not found");
      return;
    }

    titleInput.value = "the new todo title to add";
    titleInput.dispatchEvent(new Event("input"));

    // Wait for Angular to update the display binding through the title pipe
    await fixture.whenStable();

    const descriptionTextArea: HTMLTextAreaElement | null =
      todoListContainer.querySelector("#new-todo-description");

    if (!descriptionTextArea) {
      fail("text area not found");
      return;
    }

    descriptionTextArea.value = "the new todo description to add";
    descriptionTextArea.dispatchEvent(new Event("input"));

    await fixture.whenStable();

    const newTodoSubmitButton: HTMLButtonElement | null =
      todoListContainer.querySelector("#new-todo-submit");

    if (!newTodoSubmitButton) {
      fail("submit button not found");
      return;
    }
    newTodoSubmitButton.click();
    await fixture.whenStable();

    const todoItems = todoListContainer.querySelectorAll(".todo-item");
    expect(todoItems.length).toBe(3);
  });

  it("should delete todos", async () => {
    const todoListContainer: HTMLElement = fixture.nativeElement;

    const deleteTodoButtons: NodeListOf<HTMLButtonElement> =
      todoListContainer.querySelectorAll("[data-testid='delete-todo-button']");

    for (let i = 0; i < deleteTodoButtons.length; i++) {
      deleteTodoButtons[i].click();
      await fixture.whenStable();
    }

    const todoItems = todoListContainer.querySelectorAll(".todo-item");
    expect(todoItems.length).toBe(0);
  });

  it("should strikethrough todo", async () => {});
});
