import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemExpandedComponent } from './todo-item-expanded.component';

describe('TodoItemExpandedComponent', () => {
  let component: TodoItemExpandedComponent;
  let fixture: ComponentFixture<TodoItemExpandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemExpandedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoItemExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
