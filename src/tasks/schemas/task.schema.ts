import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskPriorityEnum } from '../enums/task-priority.enum';
import { TaskRecurrenceEnum } from '../enums/task-recurrence.enum';
import { TaskStatusEnum } from '../enums/task-status.enum';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  // if no values are given for status and priority, default to open and low
  @Prop({ enum: TaskStatusEnum, default: TaskStatusEnum.OPEN })
  status: TaskStatusEnum;
  @Prop({ enum: TaskPriorityEnum, default: TaskPriorityEnum.LOW })
  priority: TaskPriorityEnum;

  @Prop({
    // --- recurrence ---
    type: {
      recurrence: { type: String, enum: TaskRecurrenceEnum },
      interval: { type: Number, min: 1 },
      repeat: { type: Number, min: 1 },
    },
    required: false,
  })
  recurrence?: {
    recurrence: TaskRecurrenceEnum;
    interval: number;
    repeat: number;
  };
}

export const TaskSchema = SchemaFactory.createForClass(Task);
