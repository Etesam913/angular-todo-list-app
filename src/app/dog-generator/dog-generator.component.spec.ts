import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogGeneratorComponent } from './dog-generator.component';

describe('DogGeneratorComponent', () => {
  let component: DogGeneratorComponent;
  let fixture: ComponentFixture<DogGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
