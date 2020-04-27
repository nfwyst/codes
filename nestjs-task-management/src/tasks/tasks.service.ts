import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(getTasksFilterDto: GetTasksFilterDto): Task[] {
   const { status, search } = getTasksFilterDto
   let tasks = this.getAllTasks()
   if(status) tasks = tasks.filter(task => task.status === status)
   if(search) tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
   return tasks
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      ...createTaskDto,
      status: TaskStatus.OPEN,
      id: uuidv1()
    }
    this.tasks.push(task)
    return task
  }

  getTaskById(id: string): Task | never {
    const bond = this.tasks.find(item => item.id === id)
    if(!bond) throw new NotFoundException(`Task with id ${id} not found!`)
    return bond
  }

  deleteTaskById(id: string): void {
    this.getTaskById(id)
    this.tasks = this.tasks.filter(item => item.id !== id)
  }

  updateTaskStatusById(id: string, status: TaskStatus): Task | never {
    const task = this.getTaskById(id)
    if(task) task.status = status
    return task
  }
}
