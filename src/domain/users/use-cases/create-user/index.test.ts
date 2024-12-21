import { describe, expect, test } from "vitest";
import { CreateUserUseCase } from ".";

describe("Create User", () => {
  // Deve ser possível criar um novo usuário
  test("Should be able to create a new user", async () => {
    const createUserUseCase = new CreateUserUseCase();
    const newUser = await createUserUseCase.execute({
      name: "John Doe",
      email: "john12cas346@gmail.com",
      password: "123456",
    });

    expect(newUser.statusCode).toBe(201);
  });

  // Não deve ser possível criar um novo usuário com um e-mail já existente
  //   test("Should not be able to create a new user with an email that already exists", () => {});

  // Não deve ser possível criar um novo usuário com um e-mail inválido
  //   test("Should not be able to create a new user with an invalid email", () => {});

  // Não deve ser possível criar um novo usuário com um nome inválido
  //   test("Should not be able to create a new user with an invalid name", () => {});

  // Não deve ser possível criar um novo usuário com uma senha inválida
  //   test("Should not be able to create a new user with an invalid password", () => {});

  // A senha do usuário deve ser criptografada
  //   test("The user's password must be encrypted", () => {});
});
