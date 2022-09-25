import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { User } from 'src/database/entity'
import { AuthService } from './auth.service'
import { GetUser } from './decorator'
import { AuthCredentialDto } from './dto'
import { JwtGuard } from './guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<{ access_token: string }> {
    return this.authService.signUp(authCredentialDto)
  }

  @Post('/signin')
  signin(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<{ access_token: string }> {
    return this.authService.signIn(authCredentialDto)
  }

  @Post('/test')
  @UseGuards(JwtGuard)
  test(@GetUser() user: User) {
    console.log(user)
  }
}
