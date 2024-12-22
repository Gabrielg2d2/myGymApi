import { describe, expect, test, vitest } from "vitest";
import { CreateUserUseCase } from ".";
import { RepositoryCreateUser } from "./repository";
import { InMemoryRepositoryCreateUser } from "./repository/repository-test";

describe("Create User", () => {
  describe("Success", () => {
    test("Should be able to create a new user ensuring the date format", async () => {
      const mockUserRepository =
        new InMemoryRepositoryCreateUser() as unknown as RepositoryCreateUser;

      const createUserUseCase = new CreateUserUseCase(mockUserRepository);

      const newUser = await createUserUseCase.execute({
        name: "John Doe",
        email: "john@gmail.com",
        password: "123456",
      });

      const lengthData = Object.keys(newUser.data ?? {});

      expect(newUser.statusCode).toBe(201);
      expect(lengthData).length(5);
      expect(newUser.data).toEqual({
        id: expect.any(String),
        name: "John Doe",
        email: "john@gmail.com",
        password_hash: expect.any(String),
        created_at: expect.any(Date),
      });
    });

    test("Should return a standard format in case of success", async () => {
      const mockUserRepository =
        new InMemoryRepositoryCreateUser() as unknown as RepositoryCreateUser;

      const createUserUseCase = new CreateUserUseCase(mockUserRepository);
      const newUser = await createUserUseCase.execute({
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
  });

  describe("Errors", () => {
    test("Should return a standard format in case of error", async () => {
      const mockUserRepository = {
        execute: vitest
          .fn()
          .mockRejectedValueOnce(new Error("Error: unknown error")),
      } as unknown as RepositoryCreateUser;

      const createUserUseCase = new CreateUserUseCase(mockUserRepository);
      const newUser = await createUserUseCase.execute({
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
        error: "Error: unknown error",
      });
    });

    test("Should not be able to create a new user with an email that already exists", async () => {
      const mockUserRepository =
        new InMemoryRepositoryCreateUser() as unknown as RepositoryCreateUser;

      const createUserUseCase = new CreateUserUseCase(mockUserRepository);

      await createUserUseCase.execute({
        name: "John Doe",
        email: "john@gmail.com",
        password: "123456",
      });

      const newUser = await createUserUseCase.execute({
        name: "John Doe",
        email: "john@gmail.com",
        password: "123456",
      });

      expect(newUser.statusCode).toBe(409);
    });

    test("Should not be able to create a new user with an invalid email", async () => {
      const mockUserRepository =
        new InMemoryRepositoryCreateUser() as unknown as RepositoryCreateUser;

      const createUserUseCase = new CreateUserUseCase(mockUserRepository);
      const newUser = await createUserUseCase.execute({
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
      const mockUserRepository =
        new InMemoryRepositoryCreateUser() as unknown as RepositoryCreateUser;

      const createUserUseCase = new CreateUserUseCase(mockUserRepository);
      const newUser = await createUserUseCase.execute({
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
      const mockUserRepository =
        new InMemoryRepositoryCreateUser() as unknown as RepositoryCreateUser;

      const createUserUseCase = new CreateUserUseCase(mockUserRepository);
      const newUser = await createUserUseCase.execute({
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
});
