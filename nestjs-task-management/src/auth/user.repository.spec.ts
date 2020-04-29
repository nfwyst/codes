import { Test } from '@nestjs/testing'
import { UserRepository } from './user.repository';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { User } from './user.entity';

const mockCredentialsDto = { username: 'TestUser', password: 'TestPassword' }

describe('UserRepository', () => {
  let userRepository

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository]
    }).compile()

    userRepository = module.get<UserRepository>(UserRepository)
  })

  describe('signUp', () => {
    let save

    beforeEach(() => {
      save = jest.fn()
      userRepository.create = jest.fn().mockReturnValue({ save })
    })

    it('successfully signup the user', () => {
      save.mockResolvedValue(undefined)
      expect(userRepository.signUp(mockCredentialsDto)).resolves.not.toThrow()
    })

    it('throws a conflict exception as username already exists', () => {
      save.mockRejectedValue({ code: 'ER_DUP_ENTRY' })
      expect(save).not.toHaveBeenCalled()
      expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(ConflictException)
    })

    it('throws a internal exception', () => {
      save.mockRejectedValue({ code: 1 })
      expect(save).not.toHaveBeenCalled()
      expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(InternalServerErrorException)
    })
  })

  describe('validateUserPassword', () => {
    let user
    beforeEach(() => {
      userRepository.findOne = jest.fn()
      user = new User()
      Object.assign(user, {
        username: 'Test user',
        validatePassword: jest.fn()
      })
    })

    it('return username as validation is successfull', async () => {
      userRepository.findOne.mockResolvedValue(user)
      user.validatePassword.mockResolvedValue(true)
      expect(userRepository.findOne).not.toHaveBeenCalled()
      expect(user.validatePassword).not.toHaveBeenCalled()
      const result = await userRepository.validateUserPassword(mockCredentialsDto)
      expect(userRepository.findOne).toHaveBeenCalled()
      expect(user.validatePassword).toHaveBeenCalled()
      expect(result).toEqual('Test user')
    })

    it('return null as user is not found', async () => {
      userRepository.findOne.mockResolvedValue(null)
      const result = await userRepository.validateUserPassword(mockCredentialsDto)
      expect(user.validatePassword).not.toHaveBeenCalled()
      expect(result).toBeNull()
    })

    it('return null as password is invalid', async () => {
      userRepository.findOne.mockResolvedValue(user)
      user.validatePassword.mockResolvedValue(false)
      const result = await userRepository.validateUserPassword(mockCredentialsDto)
      expect(user.validatePassword).toHaveBeenCalled()
      expect(result).toBeNull()
    })
  })
})
