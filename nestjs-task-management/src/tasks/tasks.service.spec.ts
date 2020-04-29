import { Test } from '@nestjs/testing'
import { TaskRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './types/tasks-status.enum';
import { User } from '../auth/user.entity';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
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
})
