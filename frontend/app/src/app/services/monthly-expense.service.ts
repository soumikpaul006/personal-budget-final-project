import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MonthlyExpenseService {
  private apiUrl = 'http://localhost:3000/api/expenses/monthly';

  constructor(private http: HttpClient) {}

  getMonthlyExpenses(): Observable<any> {
    return this.http.get<any>(this.apiUrl,{withCredentials:true});
  }
}
