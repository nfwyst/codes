import { Task } from './tasks.entity'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

}

