import { RepositoryUserTest } from '@/domain/users/repositories/repository-test';
import { beforeEach, describe, expect, test, vitest } from 'vitest';
import { RepositoryUsers } from '../../repositories/repository';
import { AuthenticateUserUseCase } from './main';

class makeSutAuthenticateUserUseCase {
  static execute(isError = false) {
    if (isError) {
      const repositoryTest = {
        execute: vitest
          .fn()
          .mockRejectedValueOnce(new Error('Error: unknown error')),
      } as unknown as RepositoryUsers;
      return new AuthenticateUserUseCase(repositoryTest);
    }

    const repositoryTest =
      new RepositoryUserTest() as unknown as RepositoryUsers;
    return new AuthenticateUserUseCase(repositoryTest);
  }
}

describe('AuthenticateUserUseCase', () => {
  let sut: AuthenticateUserUseCase;

  beforeEach(() => {
    sut = makeSutAuthenticateUserUseCase.execute();
  });

  test('should authenticate user', async () => {
    const result = await sut.execute({
      email: 'test@gmail.com',
      password: '123456',
    });

    expect(result).toEqual({
      data: {
        user: {
          id: expect.any(String),
          name: 'Test User',
          email: 'test@gmail.com',
          password_hash: expect.any(String),
          created_at: expect.any(Date),
        },
      },
      message: {
        en: 'User authenticated successfully',
        pt: 'Usuário autenticado com sucesso',
      },
      typeMessage: 'success',
      statusCode: 200,
      error: null,
    });
  });

  test('should return error if credentials are invalid', async () => {
    const result = await sut.execute({
      email: 'invalid@gmail.com',
      password: 'invalidpassword',
    });

    expect(result).toEqual({
      data: null,
      message: {
        en: 'Credentials are invalid',
        pt: 'Credenciais inválidas',
      },
      typeMessage: 'error',
      statusCode: 401,
      error: null,
    });
  });

  test('should return error if repository throws', async () => {
    const sutWithError = makeSutAuthenticateUserUseCase.execute(true);

    const result = await sutWithError.execute({
      email: 'invalid@gmail.com',
      password: 'invalidpassword',
    });

    expect(result).toEqual({
      data: null,
      message: {
        en: 'Service unavailable, try again later',
        pt: 'Serviço indisponível, tente novamente mais tarde',
      },
      typeMessage: 'fatal',
      statusCode: 500,
      error: null,
    });
  });
});
