import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/app.constant';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.css']
})
export class ExpenseDialogComponent implements OnInit {
  newExpense: any = {};
  budgets: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ExpenseDialogComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.fetchBudgets();
    // throw new Error('Method not implemented.');
  }

  fetchBudgets(): void {
    this.http.get<any[]>(`${AppConstant.API_URL}/budgets`,{withCredentials:true}).subscribe(
      (data) => {
        this.budgets = data;
        console.log('Budgets:', this.budgets);
      },
      (error) => {
        console.error('Error fetching budgets:', error);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.fetchBudgets();
  }
}
