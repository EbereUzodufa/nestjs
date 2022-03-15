import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ITask } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id') id: string): ITask {
    return this.tasksServices.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    return this.tasksServices.deleteTaskById(id);
  }

  @Get()
  getAllTasks(): ITask[] {
    return this.tasksServices.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.tasksServices.createTask(createTaskDto);
  }
}
