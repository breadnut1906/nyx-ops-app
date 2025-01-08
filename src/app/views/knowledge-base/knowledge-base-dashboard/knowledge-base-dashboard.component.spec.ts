import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeBaseDashboardComponent } from './knowledge-base-dashboard.component';

describe('KnowledgeBaseDashboardComponent', () => {
  let component: KnowledgeBaseDashboardComponent;
  let fixture: ComponentFixture<KnowledgeBaseDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowledgeBaseDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnowledgeBaseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
