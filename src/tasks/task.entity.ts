import { User } from './../auth/user.entity';
import { TaskStatus } from './task.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((_type) => User, (user) => user.task, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  user: User;
}
