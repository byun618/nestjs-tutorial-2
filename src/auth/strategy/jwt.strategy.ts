import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '../entity'
import { UserRepository } from '../repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    })
  }

  async validate(payload): Promise<User> {
    const { userId } = payload
    const user = await this.userRepository.findOne({
      select: { id: true, username: true },
      where: { id: userId },
    })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
