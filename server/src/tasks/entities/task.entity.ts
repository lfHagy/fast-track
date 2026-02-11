import { TaskPriorityEnum } from '../enums/task-priority.enum';
import { TaskRecurrenceEnum } from '../enums/task-recurrence.enum';
import { TaskStatusEnum } from '../enums/task-status.enum';

export class TaskRecurrence {
  recurrence: TaskRecurrenceEnum;
  interval: number;
  repeat: number;
}

export class Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;
  recurrence?: TaskRecurrence;
  createdAt = new Date();
}
