import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { DataSource, Repository } from 'typeorm'
import { AuthCredentialDto } from '../../auth/dto'
import { User } from '../entity'

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

  async createUser(authCredentialDto: AuthCredentialDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt()
      const password = await bcrypt.hash(authCredentialDto.password, salt)

      const user = this.create({ ...authCredentialDto, password })

      await this.save(user)

      return user
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException('Something went wrong')
      }
    }
  }
}
