import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';

@Component({
  selector: 'app-date-range-picker',
  imports: [ MaterialUiModule ],
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.scss'
})
export class DateRangePickerComponent {

  dateRangeForm: FormGroup = new FormGroup({
    dateRange: new FormControl([''])
  })

}
