import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalBudget: number;
  totalExpenses: number;
  budgetExpensesDifference: number;

  yourBudgetDataArray: { title: string; amount: number }[] = [];
  yourExpenseDataArray: { budgetTitle: string; expenseAmount: number }[] = [];
  monthlyExpenseData: { months: string[]; expenses: number[] };

  constructor(private http: HttpClient) { }


  ngOnInit() {
    // Fetch total budget and expenses data
    this.http.get<any>('http://localhost:3000/api/budgets/total',{withCredentials:true}).subscribe(data => {
      this.totalBudget = data.totalBudget;
    });

    this.http.get<any>('http://localhost:3000/api/expenses/total',{withCredentials:true}).subscribe(data => {
      this.totalExpenses = data.totalExpenses;
      this.budgetExpensesDifference = this.totalBudget - this.totalExpenses;
    });

    // Fetch budget data directly in the component
    this.http.get<{ title: string; amount: number }[]>('http://localhost:3000/api/budgets',{withCredentials:true}).subscribe(
      (data) => {
        this.yourBudgetDataArray = data;
      },
      (error) => {
        console.error('Error fetching budget data:', error);
      }
    );
      // Fetch expense data directly in the component
      this.http.get<{ _id: string; amount: number; comment: string; userCreated: string; budget: { title: string; amount: number } }[]>('http://localhost:3000/api/expenses', { withCredentials: true }).subscribe(
      (data) => {
        // console.log('Original Expense Data:', data);
        this.yourExpenseDataArray = this.mapToExpectedFormat(data);
      },
      (error) => {
        console.error('Error fetching expense data:', error);
      }
    );

    // Fetch monthly expense data
    this.http.get<any>('http://localhost:3000/api/expenses/monthly', { withCredentials: true }).subscribe(
      (data) => {
        this.monthlyExpenseData = data;
      },
      (error) => {
        console.error('Error fetching monthly expense data:', error);
      }
    );



  }

  private mapToExpectedFormat(data: { _id: string; amount: number; comment: string; userCreated: string; budget: { title: string; amount: number } }[]): { budgetTitle: string; expenseAmount: number }[] {
    const mappedData = data.map(item => ({ budgetTitle: item.budget.title, expenseAmount: item.amount }));
    // console.log('Mapped Expense Data:', mappedData);
    return mappedData;
  }

}
