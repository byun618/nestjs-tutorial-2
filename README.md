# nestjs-tutorial-2

NestJs 튜토리얼22222

---

## Module이란

- @Module 데코레이터 달린 클래스. 하나 이상의 루트 모듈 존재.
- 밀접하게 관련된 기능의 집합 ex) 유저 모듈, 주문 모듈, 챗 모듈 ...
- 싱글톤. 어디든 주입 가능

## Controller란

- @Controller
- 들어오는 요청을 처리하고 클라이언트로 응답 반환
- @Controller('~~')로 경로 처리
- @Get, @Post 등 handler 존재

## Provider란

- Nest의 기본 개념.
- Service, Repository, Factory, Helper 등 모두 Provider다.
- 종속성을 주입할 수 있다. 객체는 다양한 관계를 만들고 인스턴스를 연결한다.
- Service는 공통 개념. @Injectable로 감싸져서 Module에 제공
- Provider를 등록하기 위해서는 @Module에 추가한다.

## DTO

- Data Transfer Object
- 계층간 데이터 교환을 위한 객체
- DB에서 데이터를 얻어 Service나 Controller 등올 보낼때 사용하는 객체
- **데이터가 네트워크를 통해 전송되는 방법을 정의**
- Class를 이용해서 구성, Pipe와 같은 기능을 이용하기에 유용
- 데이터 유효성 체크에 사용
- 많은 프로퍼티를 가지고 있다면 유지 보수 하기에 용이하다.

## Pipe

- @Injectable 데코레이터로 달린 클래스
- Data Transformation과 Data Validation을 위해 사용
- Controller에 의해 처리되는 인수에 작동(Route Handler가 처리하는 인수에 대해 동작)
- Handler로 가기 전에 동작
- Handler-Level, Parameter-Level, Global-Level
- 기본 제공하는 Built-In Pipe
  - Validation Pipe
  - PraseInt Pipe
  - ParseBool Pipe
  - ParseArray Pipe
  - ParseUUID Pipe
  - DefaultValue Pipe
- 필요한 모듈
  - class-validator class-transformer

## Custom Pipe

- PipeTransform 인터페이스를 커스텀 파이프에 구현
- transform()
  - value, metadata
  - value: 처리가 된 인자의 값
  - metadata: 인자에 대한 메타데이터를 포함한 객체

## TypeORM

- 필요한 모듈
  - pg typeorm @nestjs/typeorm

## Entity

- DB Table로 변환되는 Class
- @Entity: 클래스가 엔티티임
- @PrimaryGeneratedColumn: PK
- @Column column
- @Unique(['~~'])

## Repository

- Entity 객체와 함께 동작, CRUD 처리
- DB 관련된 작업을 처리하게끔 짠 패턴을, Repository Pattern
- 사용할 module.ts 에 imports: [~~~.forFeature([])] 추가
- 기존 @EntityRepository 데코레이터는 deprecated, 다양한 방법으로 이와 유사하게 구현 가능함
  - [개념](https://velog.io/@username1103/NestJS-TypeORM)
  - [@Injectable을 이용해 하나의 Provider로 구현](https://stackoverflow.com/questions/72549668/how-to-do-custom-repository-using-typeorm-mongodb-in-nestjs)
  - [@EntityRepository 의 역할을 하는 Custom Decorator를 구현](https://greeng00se.tistory.com/57)

## JWT

- 필요한 모듈
  - @nestjs/jwt @nestjs/passport passport passport-jwt
- Jwt와 passport를 이용할 module 파일에 JwtModule과 PassportModule을 import 한다.
- 토큰 인증하고, req 객체에 user 데이터를 실을수 있다. Strategy를 이용
  - 필요한 모듈: @types/passport-jwt
  - JwtStrategy를 생성하고 PassportStrategy를 extends 한다.
    - super를 통해 secretKey와 header의 어떤 부분(Bearer)에 담겨져 오는지 설정
    - 토큰이 유효한지 확인이 되면 validate 함수를 통해 로직 동작
- 항상 종속성 주입에 대해서 생각하자.
- JwtStrategy를 사용하기 위해서
  - auth.module providers에 추가해준다. 또한, 이 Strategy를 다른 module에서도 사용하게 하기 위해서는 exports에도 추가를 한다.
  - useGuard를 이용한다.
- Custom Decorator를 이용하면 req.user가 아니라 user로 갖고 올수 있다.

## Middleware

- Pipe, Filters, Guards, Interceptors
- Pipe: 요청 유효성 검사 및 페이로드 변환
- Filters: 오류 처리 미들웨어
- Guards: 인증 미들웨어
- Interceptor: 응답 매핑 및 캐시 관리. 요청 로깅 등
- Guard -> Interceptor -> Pipe -> Controller -> Service -> Controller -> Interceptor -> Filter 순으로 call 된다
- JwtGuard를 구현하여, PassportModule을 따로 export 하지 않아도 되게 변경

## 인증된 유저의 접근

- 기존 진행한 인증관련은 Auth에서 구현하고 Auth에서 사용했다. 이를 다른 Module에서도 사용하기 위해서는 다른 Module에서 import가 필요하다.

## Entity Relation

- Entity 작성시, @ManyToOne, @OneToOne 등의 데코레이터로 설정한다.
- Table은 id post-fix로 자동으로 붙는다.
- 생성시에는

```ts
const board = this.create({
  ...createBoardDto,
  status: BoardStatus.PUBLIC,
  user,
})
```

- 조건을 걸어 쿼리 또는 삭제 시에는

```ts
const result = await this.boardRepository.delete({ id, user })
```

---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
