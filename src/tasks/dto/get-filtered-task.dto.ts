import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.enum';

export class GetTasksFilterTaskDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  search: string;
}
