import { Routes } from '@angular/router';
import { Budget } from './pages/budget/budget';
import { Home } from './pages/home/home';

export const routes: Routes = [
    { path: 'budget', component: Budget },
    { path: 'home', component: Home },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
