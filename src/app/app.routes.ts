import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then((m) => m.LoginComponent),
        title: 'Login',
    },
    {
        path: '',
        loadComponent: () => import('./views/main-layout/main-layout.component').then((m) => m.MainLayoutComponent), /**Main Layout */
        children: [
            {
                path: '',
                loadComponent: () => import('./views/dashboard/dashboard.component').then((m) => m.DashboardComponent),
                title: 'Operations Manager | Dashboard',
            },
            {
                path: 'task-monitoring',
                title: 'Operations Manager | Task Monitoring',
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./views/task-monitoring/task-dashboard/task-dashboard.component').then((m) => m.TaskDashboardComponent),
                    },
                    {
                        path: 'tasks',
                        loadComponent: () => import('./views/task-monitoring/tasks/tasks.component').then((m) => m.TasksComponent),
                    }
                ]
            },
            {
                path: 'scheduler',
                title: 'Operations Manager | Scheduler',
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./views/scheduler/scheduler-dashboard/scheduler-dashboard.component').then((m) => m.SchedulerDashboardComponent),
                    },
                    {
                        path: 'gantt-chart',
                        loadComponent: () => import('./views/scheduler/scheduler-gantt-chart/scheduler-gantt-chart.component').then((m) => m.SchedulerGanttChartComponent),
                    }
                ]
            }
        ]
    },
    {
        path: "**",
        loadComponent: () => import('./views/error-page/error-page.component').then(m => m.ErrorPageComponent),
        title: '404 Page Not Found'
    }
];
