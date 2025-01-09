import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { UtilityService } from '../../../services/utility.service';
import { gantt } from 'dhtmlx-gantt';
import moment from 'moment';
import { MatSidenav } from '@angular/material/sidenav';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentsModule } from '../../../modules/components/components.module';

declare const $: any; // To avoid TypeScript errors for jQuery

@Component({
  selector: 'app-scheduler-gantt-chart',
  imports: [ MaterialUiModule, ComponentsModule ],
  templateUrl: './scheduler-gantt-chart.component.html',
  styleUrl: './scheduler-gantt-chart.component.scss'
})
export class SchedulerGanttChartComponent implements OnInit, AfterViewInit {
  
  @ViewChild('gantt', { static: true }) ganttContainer!: ElementRef;
  @ViewChild('drawer') drawer!: MatSidenav;
  
  /**Parent Task */
  projectForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    project: new FormControl('', [ Validators.required ]),
    description: new FormControl('', [ Validators.required ]),
    start_date: new FormControl(moment().format('YYYY-MM-DD')),
    duration: new FormControl(1),
    readonly: new FormControl(true),
    status: new FormControl(''),
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
      // this.taskForm.patchValue(data);
      
      // this.dialog.open(this.newTask);
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
      { name: "text", label: "Employees", width: "*", tree: true }, // Task name
      { name: "start_date", label: "Start Date", align: "center", width: 100 }, // Start date
    ];
    
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
      data: [
        { id: 1, text: 'Task 1', description: "This is the first task.", start_date: moment("2025-01-01").toDate(), duration: 5, color: "#FF6347", readonly: false, open: true },
        { id: 2, text: 'Task 1.1', description: "This is the second task.", start_date: moment("2025-01-01").toDate(), duration: 3, color: "#4682B4", readonly: false, parent: 1 }
      ],
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
}
