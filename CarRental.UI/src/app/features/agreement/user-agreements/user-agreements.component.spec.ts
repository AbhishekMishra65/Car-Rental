import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAgreementsComponent } from './user-agreements.component';

describe('UserAgreementsComponent', () => {
  let component: UserAgreementsComponent;
  let fixture: ComponentFixture<UserAgreementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAgreementsComponent]
    });
    fixture = TestBed.createComponent(UserAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
