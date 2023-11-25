import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBudgetDialogComponent } from './edit-budget-dialog.component';

describe('EditBudgetDialogComponent', () => {
  let component: EditBudgetDialogComponent;
  let fixture: ComponentFixture<EditBudgetDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBudgetDialogComponent]
    });
    fixture = TestBed.createComponent(EditBudgetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
