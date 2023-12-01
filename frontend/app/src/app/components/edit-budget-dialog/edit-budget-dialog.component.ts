import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-budget-dialog',
  templateUrl: './edit-budget-dialog.component.html',
  styleUrls: ['./edit-budget-dialog.component.css']
})
export class EditBudgetDialogComponent {
  updatedBudget: any;

  constructor(
    public dialogRef: MatDialogRef<EditBudgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updatedBudget = { ...data.budget };
  }

  onCancel(): void {
    this.dialogRef.close(this.updatedBudget);
  }
}
