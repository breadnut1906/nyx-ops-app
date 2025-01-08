import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerGanttChartComponent } from './scheduler-gantt-chart.component';

describe('SchedulerGanttChartComponent', () => {
  let component: SchedulerGanttChartComponent;
  let fixture: ComponentFixture<SchedulerGanttChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulerGanttChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulerGanttChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
