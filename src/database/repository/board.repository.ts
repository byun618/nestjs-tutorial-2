import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { CreateBoardDto } from '../../boards/dto'
import { Board, BoardStatus, User } from '../entity'

/**
 * README.md 반드시 참고
 */
@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(dataSource: DataSource) {
    super(
      Board,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    )
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const board = this.create({
      ...createBoardDto,
      status: BoardStatus.PUBLIC,
      user,
    })

    await this.save(board)

    return board
  }
}
