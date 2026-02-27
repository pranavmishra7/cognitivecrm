import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStateEditorComponent } from './workflow-state-editor.component';

describe('WorkflowStateEditorComponent', () => {
  let component: WorkflowStateEditorComponent;
  let fixture: ComponentFixture<WorkflowStateEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowStateEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowStateEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
