import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TaskPriorityEnum } from '../enums/task-priority.enum';
import { TaskRecurrenceDto } from './task-recurrence.dto';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskPriorityEnum)
  priority: TaskPriorityEnum;

  @ValidateNested()
  @Type(() => TaskRecurrenceDto)
  @IsOptional()
  recurrence?: TaskRecurrenceDto;
}
