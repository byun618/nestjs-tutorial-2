import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = 3000
  console.log(process.env.NODE_ENV)
  await app.listen(port)

  Logger.log(`Server running on ${port}`)
}
bootstrap()
