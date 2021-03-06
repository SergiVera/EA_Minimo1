import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubjectdetailComponent} from './components/subjectdetail/subjectdetail.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AddstudentComponent} from './components/addstudent/addstudent.component';
import {UpdatestudentComponent} from './components/updatestudent/updatestudent.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'studentsdetail/:id', component: SubjectdetailComponent, pathMatch: 'full'},
  { path: 'addstudent', component: AddstudentComponent },
  { path: 'updatestudent/:id', component: UpdatestudentComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
