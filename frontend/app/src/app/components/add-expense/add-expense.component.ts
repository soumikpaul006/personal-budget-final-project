import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
// import { EditExpenseDialogComponent } from '../edit-expense-dialog/edit-expense-dialog.component';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  displayedColumns: string[] = [ 'comment','amount','budgetTitle', 'date','actions'];
  expenses: any[] = [];

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getExpenses();
  }

  getExpenses(): void {
    this.http.get<any[]>('http://localhost:3000/api/expenses',{withCredentials:true}).subscribe(
      (data) => {
        console.log(data)
        this.expenses = data;
      },
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }

  openExpenseDialog(): void {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addExpense(result);
      }
    });
  }


  addExpense(newExpense: any): void {
    this.http.post<any>('http://localhost:3000/api/expenses', newExpense,{withCredentials:true}).subscribe(
      (data) => {
        console.log('Expense added successfully:', data);
        this.getExpenses(); // Refresh the expense list after adding a new expense
      },
      (error) => {
        console.error('Error adding expense:', error);
      }
    );
  }


  // //edit a expense
  // editExpense(updatedExpense: any): void {
  //   this.http.put<any>(`http://localhost:3000/api/expenses/${updatedExpense._id}`, updatedExpense, { withCredentials: true })
  //     .subscribe(
  //       (data) => {
  //         console.log('Expense updated successfully:', data);
  //         this.getExpenses(); // Refresh the expense list after updating an expense
  //       },
  //       (error) => {
  //         console.error('Error updating expense:', error);
  //       }
  //     );
  // }




    // Delete a expense
    deleteExpense(expenseId: string) {
      this.http.delete(`http://localhost:3000/api/expenses/${expenseId}`, {withCredentials:true}).subscribe(() => {
        this.getExpenses();
      });
    }

}
