import { TaskPriority } from '../enums/task-priority.enum';

export class CreateTaskDto {
  title: string;
  description: string;
  priority: TaskPriority;
  recurrence?: number;
}
