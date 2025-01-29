import { TestBed } from '@angular/core/testing';

import { SchedulerGanttChartService } from './scheduler-gantt-chart.service';

describe('SchedulerGanttChartService', () => {
  let service: SchedulerGanttChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulerGanttChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
