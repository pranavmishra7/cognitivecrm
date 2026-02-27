import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowTemplateListComponent } from './workflow-template-list.component';

describe('WorkflowTemplateListComponent', () => {
  let component: WorkflowTemplateListComponent;
  let fixture: ComponentFixture<WorkflowTemplateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowTemplateListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
