import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkflowApiService } from '../../services/config/workflow-api.service';
import { WorkflowTemplateDto } from '../../models/workflow.models';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-workflow-template-list',
  standalone: true,
  templateUrl: './workflow-template-list.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class WorkflowTemplateListComponent implements OnInit {

  templates: WorkflowTemplateDto[] = [];

  constructor(
    private api: WorkflowApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.getTemplates().subscribe(res => {
      this.templates = res;
    });
  }

  create() {
    this.router.navigate(['/workflow/new']);
  }

  edit(id: string) {
    this.router.navigate(['/workflow/edit', id]);
  }
}