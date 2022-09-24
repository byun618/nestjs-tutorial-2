import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Board } from './boards/board.entity'
import { BoardsModule } from './boards/boards.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'yun525',
      database: 'board-app',
      entities: [Board],
      synchronize: true,
    }),
    BoardsModule,
  ],
})
export class AppModule {}
