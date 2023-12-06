import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { AddBudgetComponent } from './components/add-budget/add-budget.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AddBudgetDialogComponent } from './components/add-budget-dialog/add-budget-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; // Ensure MatOptionModule is imported
import { MatCardModule } from '@angular/material/card';

import { EditBudgetDialogComponent } from './components/edit-budget-dialog/edit-budget-dialog.component';
import { ExpenseDialogComponent } from './components/expense-dialog/expense-dialog.component';
import { EditExpenseDialogComponent } from './components/edit-expense-dialog/edit-expense-dialog.component';
import { BudgetChart1Component } from './components/budget-chart-1/budget-chart-1.component';
import { ExpenseBarChart2Component } from './components/expense-bar-chart-2/expense-bar-chart-2.component';
import { LineChart3Component } from './components/line-chart-3/line-chart-3.component';
import { RadarChart4Component } from './components/radar-chart-4/radar-chart-4.component';
import { MonthlyExpenseChartComponent } from './components/monthly-expense-chart/monthly-expense-chart.component';
import { AuthenticationService } from './authentication.service';
import { AuthInterceptor } from './auth-interceptor.service';
// import { NgChartsModule } from 'ng2-charts';
// import { ChartsModule } from 'ng2-charts';

// import { NgChartsModule } from 'ng2-charts';
// import { BarChart6Component } from './components/bar-chart-6/bar-chart-6.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    AddBudgetComponent,
    AddExpenseComponent,
    DashboardComponent,
    SidebarComponent,
    AddBudgetDialogComponent,
    EditBudgetDialogComponent,
    ExpenseDialogComponent,
    EditExpenseDialogComponent,
    BudgetChart1Component,
    ExpenseBarChart2Component,
    LineChart3Component,
    RadarChart4Component,
    MonthlyExpenseChartComponent,
    // BarChart6Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    // NgChartsModule,
    // ChartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // NgChartsModule
  ],
  providers: [AuthenticationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
