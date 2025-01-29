import { AfterViewInit, Component, effect, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { ComponentsModule } from '../../../modules/components/components.module';
import { UtilityService } from '../../../services/utility.service';
import { SchedulerGanttChartService } from '../../../services/scheduler-gantt-chart.service';
import { ScheduledTask } from '../../../interfaces/scheduled-task';
import { gantt } from 'dhtmlx-gantt';
import moment from 'moment';

declare const $: any; // To avoid TypeScript errors for jQuery
@Component({
  selector: 'app-scheduler-gantt-chart',
  imports: [ MaterialUiModule, ComponentsModule ],
  templateUrl: './scheduler-gantt-chart.component.html',
  styleUrl: './scheduler-gantt-chart.component.scss',
  providers: [ UtilityService, SchedulerGanttChartService ]
})
export class SchedulerGanttChartComponent implements OnInit, AfterViewInit {
  
  @ViewChild('gantt', { static: true }) ganttContainer!: ElementRef;

  utility = inject(UtilityService);
  schedulerGanttChartService = inject(SchedulerGanttChartService);
  
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
  
  constructor() {
    effect(() => {
      // Fetch scheduled tasks on initialization and update the Gantt chart when the data changes
      const data = this.schedulerGanttChartService.scheduledTasks();
      this.onInitializeGanttChart(data, { start: moment().startOf('month').toDate(), end: moment().toDate() });

      console.log(data);
      
    })
  }

  ngOnInit(): void {
    // Fetch scheduled tasks on initialization
    this.schedulerGanttChartService.onFetchScheduledTasks();
  }
  
  ngAfterViewInit(): void {
    this.initializeDateRangePicker();
  }

  onInitializeGanttChart(data: ScheduledTask[], dateRange: any) {
    
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
      const data: any = gantt.getTask(id);
      const task: any = Object.keys(gantt.getTask(id))
        .filter((key) => !key.startsWith('$')) // Exclude properties starting with "$"
        .reduce((obj, key) => {
          obj[key] = data[key];
          return obj;
        }, {} as Record<string, any>);
      this.schedulerGanttChartService.onEditTask(task);
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
      if (!task.parent) {
        // Parent Task
        return `Assigned Tech (2)`;
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
    gantt.parse({ data }); 
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
        // Update the Gantt chart with the new date range
        const event: any = { start: start.toISOString(), end: end.toISOString(), label }
        const data = this.schedulerGanttChartService.scheduledTasks();
        this.onInitializeGanttChart(data, event) 
      });
    }
  }
}
