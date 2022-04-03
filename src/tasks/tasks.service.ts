import { FilterTaskDto } from './dto/get-filtered-task.dto';
import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskByFilter(filterDto: FilterTaskDto): ITask[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): ITask {
    const { title, description } = createTaskDto;
    if (!title || !description) {
      return;
    }
    const task: ITask = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTaskById(id: string) {
    // const taskIndex = this.tasks.findIndex((task) => task.id === id);

    // if (taskIndex > -1) {
    //   this.tasks.splice(taskIndex, 1);
    //   return true;
    // }
    // return false;

    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskById(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    if (task) {
      task.status = status;
      return task;
    }
    return 'Not Task Found';
  }
}
