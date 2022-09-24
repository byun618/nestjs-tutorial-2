import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { AuthCredentialDto } from './dto/auth-credential.dto'
import { User } from './user.entity'

/**
 * README.md 반드시 참고
 */
@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(
      User,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    )
  }

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    try {
      const user = this.create(authCredentialDto)

      await this.save(user)
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException('Something went wrong')
      }
    }
  }
}
