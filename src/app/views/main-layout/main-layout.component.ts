import { Component } from '@angular/core';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { RouterOutlet } from '@angular/router';
import { ComponentsModule } from '../../modules/components/components.module';

@Component({
  selector: 'app-main-layout',
  imports: [ MaterialUiModule, RouterOutlet, ComponentsModule, ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
