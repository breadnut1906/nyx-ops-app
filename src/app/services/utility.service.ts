import { Injectable } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
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
}
