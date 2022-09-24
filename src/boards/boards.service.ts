import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateBoardDto } from './dto'
import { Board, BoardStatus } from './entity'
import { BoardRepository } from './repository'

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find()
  }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto)
  }

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOneBy({ id })

    if (!board) {
      throw new NotFoundException(`can not find board with id ${id}`)
    }

    return board
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id)

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
