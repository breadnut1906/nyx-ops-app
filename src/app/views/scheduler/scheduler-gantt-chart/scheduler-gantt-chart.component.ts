import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { ComponentsModule } from '../../../modules/components/components.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from '../../../services/utility.service';
import { MatSidenav } from '@angular/material/sidenav';
import { gantt } from 'dhtmlx-gantt';
import moment from 'moment';
import { ProjectTask } from '../../../interfaces/project-task';

declare const $: any; // To avoid TypeScript errors for jQuery
@Component({
  selector: 'app-scheduler-gantt-chart',
  imports: [ MaterialUiModule, ComponentsModule ],
  templateUrl: './scheduler-gantt-chart.component.html',
  styleUrl: './scheduler-gantt-chart.component.scss',
})
export class SchedulerGanttChartComponent implements OnInit, AfterViewInit {
  
  @ViewChild('gantt', { static: true }) ganttContainer!: ElementRef;
  @ViewChild('drawer') drawer!: MatSidenav;
  
  /**Parent Task */
  projectForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    text: new FormControl('', [ Validators.required ]),
    description: new FormControl('', [ Validators.required ]),
    start_date: new FormControl(moment().format('YYYY-MM-DD')),
    duration: new FormControl(1),
    status: new FormControl(''),
    readonly: new FormControl(true),
  })
  
  weekScaleTemplate = (date: any) => {
		var dateToStr = gantt.date.date_to_str("%d %M");
		var endDate = gantt.date.add(date, 7 - date.getDay(), "day");
		return `${dateToStr(date)} - ${dateToStr(endDate)}`;
	};

  daysStyle = (date: any) => {
		if(date.getDay() === 0 || date.getDay() === 6){
			return "weekend";
		}
		return "";
	};

  /**For Test */
  projectTasks: ProjectTask[] = [
    { 
      id: 1, 
      text: 'Project #1', 
      description: "This is the first task.", 
      start_date: moment("2025-01-01").toDate(), 
      duration: 3, 
      status: 'Complete',
      color: '#4BC0C0',
      readonly: true,
      parent: null,
    },
    { 
      id: 2, 
      text: 'Project #2', 
      description: "This is the second task.", 
      start_date: moment("2025-01-02").toDate(), 
      duration: 5, 
      status: 'On-Going',
      color: '#36A2EB',
      readonly: true,
      parent: null,
    },
    { 
      id: 3, 
      text: 'Project #1.2', 
      description: "This is the first child task.", 
      start_date: moment("2025-01-02").toDate(), 
      duration: 2, 
      status: 'Complete',
      color: '#4BC0C0',
      readonly: true,
      parent: 1
    }
  ]
  
  constructor(public utility: UtilityService) { }

  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(): void {
    this.initializeDateRangePicker();
    this.onInitializeGanttChart({ start: moment().startOf('month').toDate(), end: moment().toDate() })
  }

  onInitializeGanttChart(dateRange: any) {
    
    // Set the visible date range for the Gantt chart
    gantt.config.start_date = dateRange.start;
    gantt.config.end_date = dateRange.end;    

    gantt.config.drag_links = false;   // Disable task linking (dragging links)
    gantt.config.drag_progress = false; // Disable resizing of progress bar
    gantt.config.drag_move = true;
    gantt.config.resize_rows = true;
    
    // Disable double-click on tasks (rows)
    gantt.attachEvent("onTaskDblClick", (id, e) => {
      // Returning false prevents the default action (opening task editor, etc.)      
      const data = gantt.getTask(id);
      this.projectForm.patchValue(data);
      this.drawer.toggle();
      
      return false
    });

    // Configure timeline scales
	  gantt.config.min_column_width = 50;
    gantt.config.scale_height = 90;
      
    gantt.config.scales = [
      { unit: "month", step: 1, format: "%F, %Y"},
      { unit: "week", step: 1, format: this.weekScaleTemplate },
      { unit: "day", step: 1, format: "%D", css: this.daysStyle }
    ];

    // Width of the grid on the left
    gantt.config.columns = [
      { name: "text", label: "Project", width: "*", tree: true }, // Task name
      { name: "startDate", label: "Start Date", align: "center", width: 100 }, // Start date
    ];

    // Customize the text displayed on the task bars
    gantt.templates.task_text = (start, end, task) => {
      if (gantt.hasChild(task.id)) {
        // Parent Task
        return `Parent: ${task.text}`;
      } else {
        // Child Task
        return `Child: ${task.text}`;
      }
    };
    
    // gantt.setSkin("skyblue");

    // gantt.plugins({
    //   tooltip: true
    // });
    // gantt.attachEvent("onGanttReady", function(){
    //   var tooltips = gantt.ext.tooltips;
    //   tooltips.tooltip.setViewport(gantt.$task_data);
    // });
    

    gantt.init(this.ganttContainer.nativeElement);
    gantt.parse({
      data: this.projectTasks,
    }); 
  }
  
  initializeDateRangePicker() {
    const dateRangeInput = $('#dateRange');      
    if (dateRangeInput.length) {
      const startDate = moment().startOf('month').toDate();  // January 1st, 2024
      const endDate = moment().toDate();  // January 30th, 2024
      const range = { start: startDate, end: endDate } ;
      dateRangeInput.daterangepicker({
        opens: 'left',
        startDate: moment(range?.start),
        endDate: moment(range?.end),
        maxDate: moment(),
        ranges: {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Week': [moment().startOf('week'), moment().endOf('week')],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last 3 Months': [moment().subtract(3, 'months').startOf('month'), moment().endOf('month')],
        }
      }, (start: any, end: any, label: any) => {
        const event: any = { start: start.toISOString(), end: end.toISOString(), label }        
        this.onInitializeGanttChart(event);  
      });
    }
  }

  onClickCancel() {
    this.projectForm.reset();
    this.drawer.toggle();
  }
}
