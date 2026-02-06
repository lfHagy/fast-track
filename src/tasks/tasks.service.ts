import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { randomUUID } from 'crypto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './enums/task-status.enum';

@Injectable()
export class TasksService {
  private tasks: Task[] = []; // storing in-memory for now

  createTask(dto: CreateTaskDto) {
    try {
      const task: Task = {
        id: randomUUID(), // temporary - mongo will manage this in the future
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        status: TaskStatus.OPEN, // new tasks will default to open
        recurrence: dto.recurrence,
        createdAt: new Date(),
      };
      this.tasks.push(task);
      return task;
    } catch (error) {
      console.error('Could not create task! Error: ', error);
      return null;
    }
  }

  getTasks() {
    return this.tasks;
  }

  getOneTask(id: string) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      console.error('Could not find a task with the specified ID.');
      throw new NotFoundException();
    } else {
      return task;
    }
  }

  updateTask(id: string, dto: UpdateTaskDto): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      console.error('Could not find a task with the specified ID.');
      throw new NotFoundException();
    } else {
      if (dto.title) task.title = dto.title;
      if (dto.description) task.description = dto.description;
      if (dto.priority) task.priority = dto.priority;
      if (dto.status) task.status = dto.status;
      if (dto.recurrence) task.recurrence = dto.recurrence;
      return task;
    }
  }

  deleteTask(id: string): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    this.tasks.splice(index, 1);
  }
}
