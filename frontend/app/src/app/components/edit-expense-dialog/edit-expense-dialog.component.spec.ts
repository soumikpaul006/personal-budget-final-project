import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpenseDialogComponent } from './edit-expense-dialog.component';

describe('EditExpenseDialogComponent', () => {
  let component: EditExpenseDialogComponent;
  let fixture: ComponentFixture<EditExpenseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditExpenseDialogComponent]
    });
    fixture = TestBed.createComponent(EditExpenseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
