// add-budget.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';
import { AddBudgetDialogComponent } from '../add-budget-dialog/add-budget-dialog.component';
import { EditBudgetDialogComponent } from '../edit-budget-dialog/edit-budget-dialog.component';


@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.css']
})
export class AddBudgetComponent implements OnInit {
  budgets: any[] = [];
  // dialog: any;

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    // Fetch budgets from the backend upon component initialization
    this.fetchBudgets();
  }


  openAddBudgetDialog(): void {
    const dialogRef = this.dialog.open(AddBudgetDialogComponent, {
      width: '300px',
      data: { title: '', amount: 0 } // Initial values for the dialog form
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Instead of calling addBudget, call asBudget here
        this.asBudget(result);
      }
    });
  }

  // Change the name to asBudget for consistency
  asBudget(newBudget: any) {
    this.http.post('http://localhost:3000/api/budgets', newBudget, {withCredentials:true}).subscribe(() => {
      // Refresh the list after adding a new budget
      this.fetchBudgets();
    });
  }


  // Fetch budgets from the backend
  fetchBudgets() {
    this.http.get<any[]>('http://localhost:3000/api/budgets',{withCredentials:true}).subscribe((budgets) => {
      this.budgets = budgets;
    });
  }
  openEditBudgetDialog(budget: any): void {
    const dialogRef = this.dialog.open(EditBudgetDialogComponent, {
      width: '300px',
      data: { budget: budget } // Pass the budget object
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.updateBudget(result);
      }
    });
  }

  updateBudget(updatedBudget: any): void {
    this.http.put(`http://localhost:3000/api/budgets/${updatedBudget._id}`, updatedBudget, { withCredentials: true }).subscribe(() => {
      this.fetchBudgets();
    });
  }

  // Delete a budget
  deleteBudget(budgetId: string) {
    this.http.delete(`http://localhost:3000/api/budgets/${budgetId}`, {withCredentials:true}).subscribe(() => {
      // Refresh the list after deleting a budget
      this.fetchBudgets();
    });
  }
}
