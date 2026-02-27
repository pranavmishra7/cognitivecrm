import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowActionPanelComponent } from './workflow-action-panel.component';

describe('WorkflowActionPanelComponent', () => {
  let component: WorkflowActionPanelComponent;
  let fixture: ComponentFixture<WorkflowActionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowActionPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowActionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
