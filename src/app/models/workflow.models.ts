export interface WorkflowTemplateDto {
  id: string;
  name: string;
  formId: string;
  version: number;
  isActive: boolean;
}

export interface WorkflowStateDto {
  id?: string;
  name: string;
  sequence: number;
  isStart: boolean;
  isEnd: boolean;
  allowEdit: boolean;
  slaHours?: number;
  escalationRoleId?: string;
}

export interface WorkflowTransitionDto {
  id?: string;
  fromStateId: string;
  toStateId: string;
  actionName: string;
  requiresApproval: boolean;
  autoTransition: boolean;
  roleIds: string[];
}