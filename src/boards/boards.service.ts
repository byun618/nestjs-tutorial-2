import { Injectable, NotFoundException } from '@nestjs/common'
import { Board, BoardStatus, User } from 'src/database/entity'
import { BoardRepository } from 'src/database/repository'
import { CreateBoardDto } from './dto'

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find()
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user)
  }

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOneBy({ id })

    if (!board) {
      throw new NotFoundException(`can not find board with id ${id}`)
    }

    return board
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user })

    if (result.affected === 0) {
      throw new NotFoundException(`can not find board with id ${id}`)
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id)

    board.status = status
    await this.boardRepository.save(board)

    return board
  }
}
