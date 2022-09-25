import { Global, Module } from '@nestjs/common'
import { BoardRepository, UserRepository } from './repository'

@Global()
@Module({
  providers: [UserRepository, BoardRepository],
  exports: [UserRepository, BoardRepository],
})
export class DatabaseModule {}
