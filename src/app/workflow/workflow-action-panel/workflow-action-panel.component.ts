import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-workflow-action-panel',
  standalone: true,
  imports: [],
  templateUrl: './workflow-action-panel.component.html',
  styleUrl: './workflow-action-panel.component.css'
})
export class WorkflowActionPanelComponent implements OnInit{
ngOnInit(): void {
  throw new Error('Method not implemented.');
}

@Input() transactionId!: string;
@Input() userRoleId!: string;
}
