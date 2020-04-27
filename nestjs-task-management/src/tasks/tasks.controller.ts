import {
  Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './types/tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  // @Get()
  // @UsePipes(ValidationPipe)
  // getTasks(@Query() getTasksFilterDto: GetTasksFilterDto): Task[] {
  //   if(Object.keys(getTasksFilterDto).length) {
  //     return this.tasksService.getTasksWithFilters(getTasksFilterDto)
  //   }
  //   return this.tasksService.getAllTasks()
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto)
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task | never {
  //   return this.tasksService.getTaskById(id)
  // }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): void {
  //   return this.tasksService.deleteTaskById(id)
  // }

  // @Patch('/:id/status')
  // updateTaskStatusById(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus
  // ): Task | never {
  //   return this.tasksService.updateTaskStatusById(id, status)
  // }
}
