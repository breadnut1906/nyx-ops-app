import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutViewComponent } from './layout-view.component';

describe('LayoutViewComponent', () => {
  let component: LayoutViewComponent;
  let fixture: ComponentFixture<LayoutViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
