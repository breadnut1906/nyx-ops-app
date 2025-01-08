import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';

@Component({
  selector: 'app-layout-view',
  imports: [ MaterialUiModule, RouterOutlet, RouterModule ],
  templateUrl: './layout-view.component.html',
  styleUrl: './layout-view.component.scss'
})
export class LayoutViewComponent implements OnInit {

  title!: string;
  menus: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.data['title'];
    this.menus = this.activatedRoute.snapshot.data['menus'];    
  }

  onClickGoto(route: string) {
    this.router.navigate([`/${route}`]);
  }
  
  isActive(path: string): boolean {
    return this.router.url == `/${path}`;
  }
}
