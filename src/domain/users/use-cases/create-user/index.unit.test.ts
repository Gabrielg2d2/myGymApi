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

    test("The user's password must be encrypted", async () => {
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

      const passwordHash = newUser?.data?.password_hash;
      if (!passwordHash) {
        throw new Error("Password hash is undefined");
      }

      expect(passwordHash).not.toBe("123456");
    });
  });

  describe("Error", () => {
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

    //
    // Não deve ser possível criar um novo usuário com um e-mail inválido
    //   test("Should not be able to create a new user with an invalid email", async () => {});
    //
    // Não deve ser possível criar um novo usuário com um nome inválido
    //   test("Should not be able to create a new user with an invalid name", async () => {});
    //
    // Não deve ser possível criar um novo usuário com uma senha inválida
    //   test("Should not be able to create a new user with an invalid password", async () => {});
    // });
  });
});
