import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { BoardsController } from './boards.controller'
import { BoardsService } from './boards.service'
import { BoardRepository } from './repository'

@Module({
  imports: [AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
