import { Component } from '@angular/core';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-task-dashboard',
  imports: [ MaterialUiModule ],
  templateUrl: './task-dashboard.component.html',
  styleUrl: './task-dashboard.component.scss'
})
export class TaskDashboardComponent {
  
  constructor(public utility: UtilityService) { }

}
