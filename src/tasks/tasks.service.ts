import { User } from './../auth/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterTaskDto } from './dto/get-filtered-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.enum';
import { TaskRepository } from './task.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: TaskRepository,
    private configService: ConfigService,
  ) {
    console.log(configService.get('TEST_VALUE'));
  }

  getAllTasks(filterDto: GetTasksFilterTaskDto, user: User) {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
        user,
      },
    });
    if (!task) {
      this.throwIdNotFound(id);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    // The reason for using DELETE it is just one interaction wth DB but Remove requires more than one interaction
    // const selectedTask = await this.getTaskById(id);
    // await this.tasksRepository.remove(selectedTask);

    const result = await this.tasksRepository.delete({ id, user });

    if (result.affected === 0) {
      this.throwIdNotFound(id);
    }
  }

  async updateTaskById(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;

    await this.tasksRepository.save(task);

    return task;
  }

  private throwIdNotFound(id: string) {
    throw new NotFoundException(`Task with ID ${id} Not Found`);
  }
}
