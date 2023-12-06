import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddBudgetComponent } from './components/add-budget/add-budget.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './auth-guard.service';
const routes: Routes = [
  {
    path:'',component:HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-budget', component: AddBudgetComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-expense', component: AddExpenseComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
