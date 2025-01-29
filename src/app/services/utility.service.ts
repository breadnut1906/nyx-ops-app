import { Injectable } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Projects } from '../interfaces/projects';
import { AssignedTechnician } from '../interfaces/assigned-technician';

@Injectable()
export class UtilityService {

  projects: Projects[] = [
    { 
      id: 1, 
      name: "SkylineTracker", 
      description: "A real-time city skyline analysis tool using AI.", 
      created_at: new Date("2024-01-01"), 
      updated_at: new Date("2024-01-10") 
    },
    { 
      id: 2, 
      name: "EcoVision", 
      description: "An environmental monitoring platform for sustainable initiatives.", 
      created_at: new Date("2024-01-05"), 
      updated_at: new Date("2024-01-12") 
    },
    { 
      id: 3, 
      name: "NeuralSync", 
      description: "A brainwave synchronization app for focus and relaxation.", 
      created_at: new Date("2024-01-08"), 
      updated_at: new Date("2024-01-15") 
    },
    { 
      id: 4, 
      name: "QuantumFlow", 
      description: "A simulation tool for quantum computing research.", 
      created_at: new Date("2024-01-10"), 
      updated_at: new Date("2024-01-18") 
    },
    { 
      id: 5, 
      name: "CodeHorizon", 
      description: "A next-gen IDE with AI-assisted coding features.", 
      created_at: new Date("2024-01-12"), 
      updated_at: new Date("2024-01-20") 
    }
  ];

  technicians: AssignedTechnician[] = [
    { id: 1, name: "Alice Johnson", position: "Network Engineer" },
    { id: 2, name: "Bob Smith", position: "Software Developer" },
    { id: 3, name: "Charlie Davis", position: "System Administrator" },
    { id: 4, name: "Diana Lee", position: "Cybersecurity Specialist" },
    { id: 5, name: "Ethan Wright", position: "Cloud Engineer" }
  ];
  
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
