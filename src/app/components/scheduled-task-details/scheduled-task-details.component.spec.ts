import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledTaskDetailsComponent } from './scheduled-task-details.component';

describe('ScheduledTaskDetailsComponent', () => {
  let component: ScheduledTaskDetailsComponent;
  let fixture: ComponentFixture<ScheduledTaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledTaskDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
