import { Component, effect, inject } from '@angular/core';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { UtilityService } from '../../services/utility.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SchedulerGanttChartService } from '../../services/scheduler-gantt-chart.service';
import moment from 'moment';
import { map, Observable, startWith } from 'rxjs';
import { Projects } from '../../interfaces/projects';
import { AssignedTechnician } from '../../interfaces/assigned-technician';

@Component({
  selector: 'app-scheduled-task-details',
  imports: [ MaterialUiModule ],
  templateUrl: './scheduled-task-details.component.html',
  styleUrl: './scheduled-task-details.component.scss'
})
export class ScheduledTaskDetailsComponent {

  utility = inject(UtilityService);
  schedulerGanttChartService = inject(SchedulerGanttChartService);

  filteredProjects!: Observable<Projects[]>;  
  filteredTechnicians!: Observable<AssignedTechnician[]>;
  
  /**Parent Task */
  scheduleTaskForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    text: new FormControl('', [ Validators.required ]),
    description: new FormControl('', [ Validators.required ]),
    start_date: new FormControl(moment().format('YYYY-MM-DD')),
    duration: new FormControl(1),
    status: new FormControl(''),
    color: new FormControl('#4BC0C0'),
    readonly: new FormControl(true),
    parent: new FormControl(null),
    open: new FormControl(false),
  });

  constructor() {
    effect(() => {
      const task = this.schedulerGanttChartService.selectedScheduledTask();
      if (task) {
        this.scheduleTaskForm.patchValue(task);
      } else {
        this.scheduleTaskForm.reset();
      }
    })
  }

  ngOnInit() {
    this.filteredProjects = this.scheduleTaskForm.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterProjects(name as string) : this.utility.projects.slice();
      }));

    this.filteredTechnicians = this.scheduleTaskForm.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value ==='string'? value : value?.name;
        return name? this._filterTechnicians(name as string) : this.utility.technicians.slice();
      }));
  }

  onClickSave() {
    this.schedulerGanttChartService.onSaveTask(this.scheduleTaskForm.value);
  }

  onClickCancel() {
    this.schedulerGanttChartService.onCancelTask()
    this.scheduleTaskForm.reset();
  }

  displayFn(project: Projects): string {
    return project && project.name ? project.name : '';
  }

  displaytech(technicianian: AssignedTechnician): string {
    return technicianian && technicianian.name? technicianian.name : '';
  }

  private _filterProjects(value: string): Projects[] {
    const filterValue = value.toLowerCase();
    return this.utility.projects.filter(project => project.name.toLowerCase().includes(filterValue));
  }

  private _filterTechnicians(value: string): AssignedTechnician[] {
    const filterValue = value.toLowerCase();
    return this.utility.technicians.filter(technician => technician.name.toLowerCase().includes(filterValue));
  }

  get text() {
    return this.scheduleTaskForm.get('text');
  }

  get parentTask() {
    return this.scheduleTaskForm.get('parent');
  }
}
