import { Injectable } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  status: any[] = [
    { text: 'Complete', hex: '#4BC0C0' },
    { text: 'Pending', hex: '#FF9F40' },
    { text: 'On-Going', hex: '#36A2EB' },
    { text: 'Overdue', hex: '#FF6384' },
    { text: 'None', hex: '#CACACA' },
  ]
  
  colors: any = [
    { text: 'blue', hex: '#36A2EB', rgb: '54, 162, 235' },
    { text: 'red', hex: '#FF6384', rgb: '255, 99, 132' },
    { text: 'green', hex: '#4BC0C0', rgb: '75, 192, 192' },
    { text: 'orange', hex: '#FF9F40', rgb: '255, 159, 64' },
    { text: 'violet', hex: '#9966FF', rgb: '153, 102, 255' },
    { text: 'yellow', hex: '#FFCD56', rgb: '255, 205, 86' },
    { text: 'indigo', hex: '#3F51B5', rgb: '63, 81, 181' },
    { text: 'salmon', hex: '#FA8072', rgb: '250, 128, 114' },
    { text: 'periwinkle', hex: '#CCCCFF', rgb: '204, 204, 255' },
    { text: 'pink', hex: '#FFC0CB', rgb: '255, 192, 203' },
    { text: 'orchid', hex: '#DA70D6', rgb: '218, 112, 214' },
    { text: 'taupe', hex: '#483D3C', rgb: '72, 61, 60' },
  ];

  constructor(
    private router: Router,
    private breakPointObserver: BreakpointObserver, 
  ) { }
  
  isMobile(destroyed: Subject<void>): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.breakPointObserver
        .observe([ Breakpoints.XSmall, Breakpoints.Small ])
        .pipe(takeUntil(destroyed))
        .subscribe((result) => {
          for (const query of Object.keys(result.breakpoints)) {
            if (result.breakpoints[query]) {
              observer.next(true);
              return;
            }
          }
          observer.next(false);
      });
    });
  }

  onGotoPage(path: string) {
    this.router.navigate([ path ]);
  }
}
