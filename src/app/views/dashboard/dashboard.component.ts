import { Component } from '@angular/core';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { Router } from '@angular/router';
import { ComponentsModule } from '../../modules/components/components.module';

@Component({
  selector: 'app-dashboard',
  imports: [ MaterialUiModule, ComponentsModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  menus: any[] = [
    { text: 'Task Monitoring', image: 'clipboard.png', link: 'task-monitoring' },
    { text: 'Knowledge Base', image: 'touch.png', link: 'knowledge-base' },
    { text: 'Scheduler', image: 'tick-mark.png', link: 'scheduler' },
    { text: 'Settings', image: 'cogwheel.png', link: 'settings' },
  ]

  constructor(private router: Router) { }

  onClickGoto(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
