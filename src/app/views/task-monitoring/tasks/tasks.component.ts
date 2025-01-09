import { Component } from '@angular/core';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-tasks',
  imports: [ MaterialUiModule ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

  constructor(public utility: UtilityService) { }

}
