import { FilterTaskDto } from './dto/get-filtered-task.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ITask, TaskStatus } from './task.model';
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
  getAllTasks(@Query() filterDto?: FilterTaskDto): ITask[] {
    if (filterDto && Object.keys(filterDto).length) {
      return this.tasksServices.getTaskByFilter(filterDto);
    }
    return this.tasksServices.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.tasksServices.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.tasksServices.updateTaskById(id, status);
  }
}
