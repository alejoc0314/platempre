import { Routes } from '@angular/router';
import { ColumnsComponent } from './components/columns/columns.component';
import { HomeComponent } from './components/home/home.component';
import { LastChargeComponent } from './components/last-charge/last-charge.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'columns', component: ColumnsComponent },
  { path: 'last-charge', component: LastChargeComponent },
];
