import { BadRequestException, PipeTransform } from '@nestjs/common'
import { BoardStatus } from '../board.entity'

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC]

  transform(value: any) {
    value = value.toUpperCase()

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't BoardStatus`)
    }

    return value
  }

  private isStatusValid(string: any) {
    const index = this.StatusOptions.indexOf(string)

    return index !== -1
  }
}
