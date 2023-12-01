import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-budget-dialog',
  templateUrl: './add-budget-dialog.component.html',
  styleUrls: ['./add-budget-dialog.component.css']
})
export class AddBudgetDialogComponent {
  newBudget: any = { title: '', amount: 0 };


  constructor(public dialogRef: MatDialogRef<AddBudgetDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
