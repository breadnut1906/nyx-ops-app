import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./views/layout/layout.component').then((m) => m.LayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./auth/login/login.component').then((m) => m.LoginComponent),
                title: 'Login',
            },
            {
                path: 'home',
                loadComponent: () => import('./views/dashboard/dashboard.component').then((m) => m.DashboardComponent),
                title: 'Operations Manager | Dashboard',
            }
        ]
    }
];
