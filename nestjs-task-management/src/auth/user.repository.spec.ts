import { Test } from '@nestjs/testing'
import { UserRepository } from './user.repository';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

const mockCredentialsDto = { username: 'TestUser', password: 'TestPassword' }

describe('UserRepository', () => {
  let userRepository: UserRepository

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
})
