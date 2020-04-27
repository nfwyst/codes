import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() getTasksFilterDto: GetTasksFilterDto): Task[] {
    if(Object.keys(getTasksFilterDto).length) {
      return this.tasksService.getTasksWithFilters(getTasksFilterDto)
    }
    return this.tasksService.getAllTasks()
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto)
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task | void {
    return this.tasksService.getTaskById(id)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id)
  }

  @Patch('/:id/status')
  updateTaskStatusById(@Param('id') id: string, @Body('status') status: TaskStatus): Task | void {
    return this.tasksService.updateTaskStatusById(id, status)
  }
}
