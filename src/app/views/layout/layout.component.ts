import { Component } from '@angular/core';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [ MaterialUiModule, RouterOutlet ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
