import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Budget } from './pages/budget/budget';
import { Balances } from './pages/balances/balances';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'budget', component: Budget },
    { path: 'balances', component: Balances },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
