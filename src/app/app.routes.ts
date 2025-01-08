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
                loadComponent: () => import('./components/layout-view/layout-view.component').then((m) => m.LayoutViewComponent), /**Child Layout */
                data: { 
                    title: 'Task Monitoring', 
                    menus: [
                        { text: 'Dashboard', icon: 'dashboard', link: 'task-monitoring' },
                        { text: 'Tasks', icon: 'note-add', link: 'task-monitoring/tasks' },
                    ]
                },
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
                loadComponent: () => import('./components/layout-view/layout-view.component').then((m) => m.LayoutViewComponent), /**Child Layout */
                data: { 
                    title: 'Scheduler', 
                    menus: [
                        { text: 'Dashboard', icon: 'dashboard', link: 'scheduler' },
                        { text: 'Gantt Chart', icon: 'edit-calendar' , link: 'scheduler/gantt-chart'},
                    ]
                },
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
