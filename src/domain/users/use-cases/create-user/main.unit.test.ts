import { beforeEach, describe, expect, test, vitest } from "vitest";
import { RepositoryUsers } from "../../repositories/repository";
import { RepositoryUserTest } from "../../repositories/repository-test";
import { CreateUserUseCase } from "./main";

describe("Create User", () => {
  let mockUserRepository: RepositoryUserTest;

  beforeEach(async () => {
    mockUserRepository = new RepositoryUserTest();
    await mockUserRepository.clearUsers();
  });

  test("Should return a standard format in case of success", async () => {
    const sut = new CreateUserUseCase(mockUserRepository);
    const newUser = await sut.execute({
      name: "John Doe",
      email: "john@gmail.com",
      password: "123456",
    });

    expect(newUser).toEqual({
      data: {
        id: expect.any(String),
        name: "John Doe",
        email: "john@gmail.com",
        password_hash: expect.any(String),
        created_at: expect.any(Date),
      },
      message: {
        en: "User created successfully",
        pt: "Usuário criado com sucesso",
      },
      statusCode: 201,
      typeMessage: "success",
      error: null,
    });
  });

  test("Should return a standard format in case of error", async () => {
    const mockUserRepository = {
      execute: vitest
        .fn()
        .mockRejectedValueOnce(new Error("Error: unknown error")),
    } as unknown as RepositoryUsers;

    const sut = new CreateUserUseCase(mockUserRepository);
    const newUser = await sut.execute({
      name: "John Doe",
      email: "john@gmail.com",
      password: "123456",
    });

    expect(newUser).toEqual({
      data: null,
      message: {
        en: "Service unavailable, try again later",
        pt: "Serviço indisponível, tente novamente mais tarde",
      },
      typeMessage: "fatal",
      statusCode: 500,
      error: expect.any(String),
    });
  });

  test("Should not be able to create a new user with an email that already exists", async () => {
    const sut = new CreateUserUseCase(mockUserRepository);

    await sut.execute({
      name: "John Doe",
      email: "john@gmail.com",
      password: "123456",
    });

    const newUser = await sut.execute({
      name: "John Doe",
      email: "john@gmail.com",
      password: "123456",
    });

    expect(newUser.statusCode).toBe(409);
  });

  test("Should not be able to create a new user with an invalid email", async () => {
    const sut = new CreateUserUseCase(mockUserRepository);
    const newUser = await sut.execute({
      name: "John Doe",
      email: "john",
      password: "123456",
    });

    expect(newUser.statusCode).toBe(400);
    expect(newUser).toEqual({
      data: null,
      message: { en: "Invalid content", pt: "Conteúdo inválido" },
      typeMessage: "error",
      statusCode: 400,
      error: expect.any(Error),
    });
  });

  test("Should not be able to create a new user with an invalid name", async () => {
    const sut = new CreateUserUseCase(mockUserRepository);
    const newUser = await sut.execute({
      name: "",
      email: "john@gmail.com",
      password: "123456",
    });

    expect(newUser.statusCode).toBe(400);
    expect(newUser).toEqual({
      data: null,
      message: { en: "Invalid content", pt: "Conteúdo inválido" },
      typeMessage: "error",
      statusCode: 400,
      error: expect.any(Error),
    });
  });

  test("Should not be able to create a new user with an invalid password", async () => {
    mockUserRepository = new RepositoryUserTest() as unknown as RepositoryUsers;

    const sut = new CreateUserUseCase(mockUserRepository);
    const newUser = await sut.execute({
      name: "John",
      email: "john@gmail.com",
      password: "",
    });

    expect(newUser.statusCode).toBe(400);
    expect(newUser).toEqual({
      data: null,
      message: { en: "Invalid content", pt: "Conteúdo inválido" },
      typeMessage: "error",
      statusCode: 400,
      error: expect.any(Error),
    });
  });
});
