import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowTransitionEditorComponent } from './workflow-transition-editor.component';

describe('WorkflowTransitionEditorComponent', () => {
  let component: WorkflowTransitionEditorComponent;
  let fixture: ComponentFixture<WorkflowTransitionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowTransitionEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowTransitionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
