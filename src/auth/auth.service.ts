import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthCredentialDto } from './dto/auth-credential.dto'
import { UserRepository } from './user.repository'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(authCredentialDto: AuthCredentialDto) {
    return this.userRepository.createUser(authCredentialDto)
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredentialDto

    const user = await this.userRepository.findOneBy({ username })

    if (!user) {
      throw new ForbiddenException('Invalid credentials')
    }

    const isMatchedPassword = await bcrypt.compare(password, user.password)

    if (!isMatchedPassword) {
      throw new UnauthorizedException('login failed')
    }

    return 'success'
  }
}
