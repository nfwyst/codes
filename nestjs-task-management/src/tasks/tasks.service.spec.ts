import { Test } from '@nestjs/testing'
import { TaskRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './types/tasks-status.enum';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
})

describe('TaskService', () => {
  let taskService: TasksService
  let taskRepository

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository }
      ]
    }).compile()


    taskService = module.get<TasksService>(TasksService)
    taskRepository = module.get<TaskRepository>(TaskRepository)
  })

  describe('getTasks', () => {
    it('get all tasks form the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue')
      expect(taskRepository.getTasks).not.toHaveBeenCalled()
      const filter: GetTasksFilterDto = {
        status: TaskStatus.IN_PROGRESS, search: 'some search point'
      }
      const result = await taskService.getTasks(filter, { username: 'Test user' } as User)
      expect(taskRepository.getTasks).toHaveBeenCalled()
      expect(result).toEqual('someValue')
    })
  })

  describe('getTaskById', () => {
    it('calls taskRepository.findOne() and successfully retrieve and return the task', async () => {
      const mockTask = { title: 'Test title', description: 'Test desc' }
      taskRepository.findOne.mockResolvedValue(mockTask)
      expect(taskRepository.findOne).not.toHaveBeenCalled()
      const result = await taskService.getTaskById(1, {
        username: 'Test user', id: 12
      } as User)
      expect(result).toEqual(mockTask)
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: 12
        }
      })
    })

    it('throws an error as task is not found', () => {
      taskRepository.findOne.mockResolvedValue(null)
      expect(taskService.getTaskById(1, {
        username: 'Test user',
        id: 12
      } as User)).rejects.toThrow()
    })
  })

  describe('createTask', () => {
    it('calls taskRepository.createTask() and return the result', async () => {
      taskRepository.createTask.mockResolvedValue('someTask')
      expect(taskRepository.createTask).not.toHaveBeenCalled()
      const createTaskDto: CreateTaskDto = {
        title: 'hello', description: 'world'
      }
      const mockUser = {
        username: 'Test user',
      }
      const result = await taskService.createTask(createTaskDto, mockUser as User)
      expect(taskRepository.createTask).toHaveBeenCalledWith(createTaskDto, mockUser)
      expect(result).toEqual('someTask')
    })
  })

  describe('deleteTaskById', () => {
    it('calls taskRepository.delete() to delete a task', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 1 })
      expect(taskRepository.delete).not.toHaveBeenCalled()
      await taskService.deleteTaskById(1, { id: 2 } as User)
      expect(taskRepository.delete).toHaveBeenCalledWith({
        id: 1, userId: 2
      })
    })

    it('throws an error as task is not found', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 0 })
      expect(taskRepository.delete).not.toHaveBeenCalled()
      expect(taskService.deleteTaskById(1, { id: 2 } as User)).rejects.toThrow(NotFoundException)
    })
  })
})
