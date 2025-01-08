import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeBaseListsComponent } from './knowledge-base-lists.component';

describe('KnowledgeBaseListsComponent', () => {
  let component: KnowledgeBaseListsComponent;
  let fixture: ComponentFixture<KnowledgeBaseListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowledgeBaseListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnowledgeBaseListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
