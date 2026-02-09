import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TaskPriorityEnum } from '../enums/task-priority.enum';
import { Type } from 'class-transformer';
import { UpdateTaskRecurrenceDto } from './update-task-recurrence-dto';
import { TaskStatusEnum } from '../enums/task-status.enum';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskPriorityEnum)
  priority?: TaskPriorityEnum;

  @ValidateNested()
  @Type(() => UpdateTaskRecurrenceDto)
  @IsOptional()
  recurrence?: UpdateTaskRecurrenceDto;

  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status: any;
}
