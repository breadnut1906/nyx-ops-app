import { Component } from '@angular/core';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-scheduler-dashboard',
  imports: [ MaterialUiModule ],
  templateUrl: './scheduler-dashboard.component.html',
  styleUrl: './scheduler-dashboard.component.scss'
})
export class SchedulerDashboardComponent {
  
  constructor(public utility: UtilityService) { }

}
