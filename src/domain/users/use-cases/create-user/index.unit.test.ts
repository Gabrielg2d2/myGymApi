import { describe, expect, test, vitest } from "vitest";
import { CreateUserUseCase } from ".";
import { RepositoryCreateUser } from "./repository";

describe("Create User", () => {
  describe("Success", () => {
    test("Should be able to create a new user", async () => {
      const mockUserRepository = {
        execute: vitest.fn().mockReturnValue({
          id: "1c56ads1c65a1sc65as",
          name: "John Doe",
          email: "john@gmail.com",
          password_hash: "csac1sa56c1123456",
          created_at: "2024-12-12T21:33:33.001Z",
        }),
      } as unknown as RepositoryCreateUser;

      const createUserUseCase = new CreateUserUseCase(mockUserRepository);
      const newUser = await createUserUseCase.execute({
        name: "John Doe",
        email: "john@gmail.com",
        password: "123456",
      });

      expect(newUser.statusCode).toBe(201);
    });

    test("Should return a standard format in case of success", async () => {
      const mockUserRepository = {
        execute: vitest.fn().mockReturnValue({
          id: "1c56ads1c65a1sc65as",
          name: "John Doe",
          email: "john@gmail.com",
          password_hash: "csac1sa56c1123456",
          created_at: "2024-12-12T21:33:33.001Z",
        }),
      } as unknown as RepositoryCreateUser;

      const createUserUseCase = new CreateUserUseCase(mockUserRepository);
      const newUser = await createUserUseCase.execute({
        name: "John Doe",
        email: "john@gmail.com",
        password: "123456",
      });

      expect(newUser).toEqual({
        data: {
          id: "1c56ads1c65a1sc65as",
          name: "John Doe",
          email: "john@gmail.com",
          password_hash: "csac1sa56c1123456",
          created_at: "2024-12-12T21:33:33.001Z",
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

  describe("Error", () => {
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
      const mockUserRepository = {
        execute: vitest
          .fn()
          .mockRejectedValueOnce(new Error("Error: User already exists")),
      } as unknown as RepositoryCreateUser;

      const createUserUseCase = new CreateUserUseCase(mockUserRepository);
      const newUser = await createUserUseCase.execute({
        name: "John Doe",
        email: "john@gmail.com",
        password: "123456",
      });

      expect(newUser.statusCode).toBe(409);
    });

    test("Should not be able to create a new user with an invalid email", async () => {
      const mockUserRepository = {
        execute: vitest.fn(),
      } as unknown as RepositoryCreateUser;

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
      const mockUserRepository = {
        execute: vitest.fn(),
      } as unknown as RepositoryCreateUser;

      const createUserUseCase = new CreateUserUseCase(mockUserRepository);
      const newUser = await createUserUseCase.execute({
        name: "",
        email: "john@gmail.com",
        password: "123456",
      });

      console.log(newUser);

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
      const mockUserRepository = {
        execute: vitest.fn(),
      } as unknown as RepositoryCreateUser;

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
