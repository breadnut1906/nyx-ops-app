import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangePickerComponent } from '../../components/date-range-picker/date-range-picker.component';
import { FooterComponent } from '../../components/footer/footer.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FooterComponent,
    DateRangePickerComponent,
  ],
  exports: [
    FooterComponent,
    DateRangePickerComponent,
  ]
})
export class ComponentsModule { }
