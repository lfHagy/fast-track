import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskStatusEnum } from './enums/task-status.enum';
import { InjectModel } from '@nestjs/mongoose';
import { TaskDocument } from './schemas/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async createTask(dto: CreateTaskDto) {
    try {
      const task = await this.taskModel.create({
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        status: TaskStatusEnum.OPEN, // new tasks will default to open
        recurrence: dto.recurrence,
      });
      return task;
    } catch (error) {
      console.error('taskService could not create the task. ', error);
      throw error;
    }
  }

  async getTasks() {
    return await this.taskModel.find().exec();
  }

  async getOneTask(id: string) {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      console.error('taskService could not find a task with that ID.');
      throw new NotFoundException();
    } else {
      return task;
    }
  }

  async updateTask(id: string, dto: UpdateTaskDto) {
    const task = await this.taskModel
      .findByIdAndUpdate(id, dto, {
        new: true,
        runValidators: true,
      })
      .exec();
    if (!task) {
      console.error('taskService could not update the task - ID not found.');
      throw new NotFoundException();
    }
    return task;
  }

  async deleteTask(id: string) {
    const task = await this.taskModel.findByIdAndDelete(id);
    if (!task) {
      console.error('taskService could not delete the task - ID not found.');
      throw new NotFoundException();
    } else {
      return task;
    }
  }
}
