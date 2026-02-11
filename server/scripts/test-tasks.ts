import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { TaskPriorityEnum } from '../src/tasks/enums/task-priority.enum';
import { TaskStatusEnum } from '../src/tasks/enums/task-status.enum';
import { TasksService } from '../src/tasks/tasks.service';
async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  const tasksService = appContext.get(TasksService);

  console.log('--- Creating task ---');
  const newTask = await tasksService.createTask({
    title: 'Test Task',
    description: 'This is a test task from script',
    priority: TaskPriorityEnum.LOW,
  });
  console.log(newTask);

  console.log('--- Fetching all tasks ---');
  const tasks = await tasksService.getTasks();
  console.log(tasks);

  console.log('--- Updating task ---');
  const updatedTask = await tasksService.updateTask(newTask.id, {
    status: TaskStatusEnum.DONE,
    title: 'Updated Test Task',
  });
  console.log(updatedTask);

  console.log('--- Deleting task ---');
  const deletedTask = await tasksService.deleteTask(newTask.id);
  console.log('Deleted task:', deletedTask);

  await appContext.close();
}

bootstrap().catch((err) => console.error(err));
