import { IsEnum, IsInt, Min } from 'class-validator';
import { TaskRecurrenceEnum } from '../enums/task-recurrence.enum';

export class TaskRecurrenceDto {
  @IsEnum(TaskRecurrenceEnum)
  recurrence: TaskRecurrenceEnum; // daily, weekly, monthly

  @IsInt()
  @Min(1)
  interval: number; // every x days/weeks/months

  @IsInt()
  @Min(1)
  repeat: number; // stop after x ocurrences
}
