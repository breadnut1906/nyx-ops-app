import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangePickerComponent } from '../../components/date-range-picker/date-range-picker.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ScheduledTaskDetailsComponent } from '../../components/scheduled-task-details/scheduled-task-details.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FooterComponent,
    DateRangePickerComponent,
    ScheduledTaskDetailsComponent,
  ],
  exports: [
    FooterComponent,
    DateRangePickerComponent,
    ScheduledTaskDetailsComponent,
  ]
})
export class ComponentsModule { }
