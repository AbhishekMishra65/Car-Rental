import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarComponent } from './create-car.component';

describe('CreateCarComponent', () => {
  let component: CreateCarComponent;
  let fixture: ComponentFixture<CreateCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCarComponent]
    });
    fixture = TestBed.createComponent(CreateCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
