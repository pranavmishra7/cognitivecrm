import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowRoleMappingComponent } from './workflow-role-mapping.component';

describe('WorkflowRoleMappingComponent', () => {
  let component: WorkflowRoleMappingComponent;
  let fixture: ComponentFixture<WorkflowRoleMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowRoleMappingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowRoleMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
