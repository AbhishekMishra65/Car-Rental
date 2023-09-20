import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallcarsAdminComponent } from './getallcars-admin.component';

describe('GetallcarsAdminComponent', () => {
  let component: GetallcarsAdminComponent;
  let fixture: ComponentFixture<GetallcarsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetallcarsAdminComponent]
    });
    fixture = TestBed.createComponent(GetallcarsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
