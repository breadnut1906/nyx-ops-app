import { Injectable, signal } from '@angular/core';
import { ScheduledTask } from '../interfaces/scheduled-task';
import moment from 'moment';

@Injectable()
export class SchedulerGanttChartService {

  isDrawerOpen = signal<boolean>(false);
  scheduledTasks = signal<ScheduledTask[]>([]);
  selectedScheduledTask = signal<ScheduledTask | null>(null);

  constructor() { }

  onFetchScheduledTasks() {
    // call api to fetch scheduled tasks
    this.scheduledTasks.set([
      { 
        id: 1, 
        text: 'Project #1', 
        description: "This is the first task.", 
        start_date: moment("2025-01-01").toDate(), 
        duration: 3, 
        status: 'Complete',
        color: '#4BC0C0',
        readonly: false,
        parent: null,
        open: true,
      },
      { 
        id: 2, 
        text: 'Tech #1', 
        description: "This is the second task.", 
        start_date: moment("2025-01-02").toDate(), 
        duration: 5, 
        status: 'On-Going',
        color: '#36A2EB',
        readonly: false,
        parent: 1,
        open: true,
      },
      { 
        id: 3, 
        text: 'Tech #2', 
        description: "This is the first child task.", 
        start_date: moment("2025-01-02").toDate(), 
        duration: 2, 
        status: 'Complete',
        color: '#4BC0C0',
        readonly: false,
        parent: 1,
        open: true,
      }
    ])
  }

  onNewTask() {
    this.selectedScheduledTask.set(null);
    this.isDrawerOpen.set(true);
  }

  onAddTask(task: ScheduledTask) {
    this.scheduledTasks.set([...this.scheduledTasks(), task]);
  }

  onEditTask(task: ScheduledTask) {
    this.selectedScheduledTask.set(task);
    this.isDrawerOpen.set(true);
  }
  
  onSaveTask(task: ScheduledTask) {
    console.log(task);
    this.isDrawerOpen.set(false);
  }

  onCancelTask() {
    this.selectedScheduledTask.set(null);
    this.isDrawerOpen.set(false);
  }
}
