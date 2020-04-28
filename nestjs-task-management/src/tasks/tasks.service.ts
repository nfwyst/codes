import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './types/tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) { }

  getTasks(getTasksFilterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(getTasksFilterDto, user)
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user)
  }

  async getTaskById(id: number): Promise<Task> | never {
    const found = await this.taskRepository.findOne(id)
    if (!found) throw new NotFoundException(`Task with id ${id} not found!`)
    return found
  }

  async deleteTaskById(id: number): Promise<void> {
    const { affected } = await this.taskRepository.delete(id)
    if (affected === 0) throw new NotFoundException(`Task with id ${id} not found!`)
  }

  async updateTaskStatusById(id: number, status: TaskStatus): Promise<Task> | never {
    const task = await this.getTaskById(id)
    if (task) task.status = status
    await task.save()
    return task
  }
}
