import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from './types/jwt-token.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtServer: JwtService
  ) { }

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<JwtToken | never> {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto)
    if (!username) throw new UnauthorizedException('invalid credentials')

    const payload = { username }
    const accessToken = this.jwtServer.sign(payload)

    return { accessToken }
  }
}
