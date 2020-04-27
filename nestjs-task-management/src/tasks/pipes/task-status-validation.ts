import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { TaskStatus } from '../tasks.model'

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowdStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ]

  transform(value: any, metadata: ArgumentMetadata): any {
    try {
      value = value.toUpperCase()
    } catch {
      throw new BadRequestException(`${value} is an invalid status`)
    }
    if(!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`)
    }
    return value
  }

  private isStatusValid(status: any): boolean {
    return this.allowdStatuses.includes(status)
  }
}
