import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { TaskRecurrenceEnum } from '../enums/task-recurrence.enum';

export class UpdateTaskRecurrenceDto {
  @IsOptional()
  @IsEnum(TaskRecurrenceEnum)
  recurrence?: TaskRecurrenceEnum;

  @IsOptional()
  @IsInt()
  @Min(1)
  interval?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  repeat?: number;
}
