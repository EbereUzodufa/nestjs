import { User } from './../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterTaskDto } from './dto/get-filtered-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  // constructor(private manager: EntityManager) {}

  async getTasks(
    filterDto: GetTasksFilterTaskDto,
    user: User,
  ): Promise<Task[]> {
    const query = this.createQueryBuilder('task');

    const { search, status } = filterDto;

    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);
    return task;
  }
}
