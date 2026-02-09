import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TaskPriority } from '../enums/task-priority.enum';
import { TaskRecurrenceDto } from './task-recurrence.dto';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @ValidateNested()
  @Type(() => TaskRecurrenceDto)
  @IsOptional()
  recurrence?: TaskRecurrenceDto;
}
