import { Task } from './tasks.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './types/tasks-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = getTasksFilterDto
    const query = this.createQueryBuilder('task')

    if (status) query.andWhere('task.status = :status', { status })
    if (search) query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })

    const tasks = await query.getMany()
    return tasks
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task()
    Object.assign(task, {
      ...createTaskDto,
      status: TaskStatus.OPEN
    })
    await task.save()
    return task
  }
}
