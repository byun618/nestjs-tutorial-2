import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { AuthCredentialDto } from './dto'
import { UserRepository } from './repository'

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ access_token: string }> {
    const { id: userId } = await this.userRepository.createUser(
      authCredentialDto,
    )

    return await this.getToken(userId)
  }

  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ access_token: string }> {
    const { username, password } = authCredentialDto

    const user = await this.userRepository.findOneBy({ username })

    if (!user) {
      throw new ForbiddenException('Invalid credentials')
    }

    const isMatchedPassword = await bcrypt.compare(password, user.password)

    if (!isMatchedPassword) {
      throw new UnauthorizedException('login failed')
    }

    return this.getToken(user.id)
  }

  async getToken(userId: number): Promise<{ access_token: string }> {
    const token = await this.jwtService.signAsync({ userId })

    return { access_token: token }
  }
}
