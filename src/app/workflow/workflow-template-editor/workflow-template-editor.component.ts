import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowApiService } from '../../services/config/workflow-api.service';
import { WorkflowStateDto, WorkflowTransitionDto } from '../../models/workflow.models';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { FormApiService } from '../../services/config/form-api-service.service';
import { FormDto } from '../../models/FieldConfig';
@Component({
  selector: 'app-workflow-template-editor',
  standalone: true,
  templateUrl: './workflow-template-editor.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class WorkflowTemplateEditorComponent implements OnInit {

  templateId?: string;
  name = '';

  states: WorkflowStateDto[] = [];
  transitions: WorkflowTransitionDto[] = [];
  selectedFormId: string | null = null;
  clientId: string | null = null;
  forms: FormDto[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: WorkflowApiService,
    private formApi: FormApiService
  ) {
    this.templateId = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (this.templateId) {
      this.load();
    }
  }
  ngOnInit(): void {
    this.getformsByClientId(localStorage.getItem('clientId') || "");
  }
  getformsByClientId(clientId: string) {
     this.formApi.get(clientId || "").subscribe({
      next: (res) => {
        if (res.success) {
          this.forms = res.data;
        }
      },
      error: () => {
        // Handle error case
      }
    })
  }
  load() {
    this.api.getTemplate(this.templateId!).subscribe(res => {
      this.name = res.name;
      this.states = res.states;
      this.transitions = res.transitions;
    });
  }

  addState() {
    this.states.push({
      id:uuidv4(),
      name: '',
      sequence: this.states.length + 1,
      isStart: false,
      isEnd: false,
      allowEdit: true,
      roleIds: []
    } as any);
  }

  addTransition() {
    this.transitions.push({
      fromStateId: '',
      toStateId: '',
      actionName: '',
      requiresApproval: false,
      autoTransition: false,
      roleIds: []
    });
  }

  save() {
    const payload = {
      id: this.templateId,
      name: this.name,
      formId : this.selectedFormId,
      states: this.states,
      transitions: this.transitions
    };

    this.api.saveTemplate(payload).subscribe(() => {
      this.router.navigate(['/workflow']);
    });
  }
  setStartState(selected: any) {
  this.states.forEach(s => s.isStart = false);
  selected.isStart = true;
}
}

