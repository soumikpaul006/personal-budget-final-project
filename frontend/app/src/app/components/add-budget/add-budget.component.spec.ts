import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBudgetComponent } from './add-budget.component';

describe('AddBudgetComponent', () => {
  let component: AddBudgetComponent;
  let fixture: ComponentFixture<AddBudgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBudgetComponent]
    });
    fixture = TestBed.createComponent(AddBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
