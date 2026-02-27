import { Routes } from '@angular/router';
import { WorkflowTemplateListComponent } from './workflow/workflow-template-list/workflow-template-list.component';
import { WorkflowTemplateEditorComponent } from './workflow/workflow-template-editor/workflow-template-editor.component';

export const WORKFLOW_ROUTES: Routes = [
  { path: '', component: WorkflowTemplateListComponent },
  { path: 'edit/:id', component: WorkflowTemplateEditorComponent },
  { path: 'new', component: WorkflowTemplateEditorComponent }
];