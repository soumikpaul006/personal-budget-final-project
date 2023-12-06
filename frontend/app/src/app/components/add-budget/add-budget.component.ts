import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';
import { AddBudgetDialogComponent } from '../add-budget-dialog/add-budget-dialog.component';
import { EditBudgetDialogComponent } from '../edit-budget-dialog/edit-budget-dialog.component';
import { AppConstant } from 'src/app/app.constant';


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
    this.fetchBudgets();
  }


  openAddBudgetDialog(): void {
    const dialogRef = this.dialog.open(AddBudgetDialogComponent, {
      width: '300px',
      data: { title: '', amount: 0 }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.asBudget(result);
      }
    });
  }


  asBudget(newBudget: any) {
    this.http.post(`${AppConstant.API_URL}/budgets`, newBudget, {withCredentials:true}).subscribe(() => {
      this.fetchBudgets();
    });
  }


  fetchBudgets() {
    this.http.get<any[]>(`${AppConstant.API_URL}/budgets`,{withCredentials:true}).subscribe((budgets) => {
      this.budgets = budgets;
    });
  }

  openEditBudgetDialog(budget: any): void {
    const dialogRef = this.dialog.open(EditBudgetDialogComponent, {
      width: '300px',
      data: { budget: budget }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.updateBudget(result);
      }
    });
  }

  updateBudget(updatedBudget: any): void {
    this.http.put(`${AppConstant.API_URL}/budgets/${updatedBudget._id}`, updatedBudget, { withCredentials: true }).subscribe(() => {
      this.fetchBudgets();
    });
  }


  deleteBudget(budgetId: string) {
    this.http.delete(`${AppConstant.API_URL}/budgets/${budgetId}`, {withCredentials:true}).subscribe(() => {
      this.fetchBudgets();
    });
  }
}
