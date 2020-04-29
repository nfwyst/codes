import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const user = this.create()
    const { password } = authCredentialsDto
    const salt = await bcrypt.genSalt()
    Object.assign(user, {
      ...authCredentialsDto,
      salt,
      password: await this.hashPassword(password, salt)
    })
    try {
      await user.save()
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('username already exists!')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  private async hashPassword(password: string, slat: string): Promise<string> {
    return bcrypt.hash(password, slat)
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string | void> {
    const { username, password } = authCredentialsDto
    const user = await this.findOne({ username })
    if (user && await user.validatePassword(password)) {
      return user.username
    }
    return null
  }
}
