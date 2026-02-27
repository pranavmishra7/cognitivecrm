import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowTemplateEditorComponent } from './workflow-template-editor.component';

describe('WorkflowTemplateEditorComponent', () => {
  let component: WorkflowTemplateEditorComponent;
  let fixture: ComponentFixture<WorkflowTemplateEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowTemplateEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowTemplateEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
