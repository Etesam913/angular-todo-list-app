import { TestBed } from "@angular/core/testing";

import { TodoListService } from "./todo-list.service";
import { provideRouter } from "@angular/router";

describe("TodoListService", () => {
  let service: TodoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
    service = TestBed.inject(TodoListService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
