import { describe, expect, test } from "vitest";
import { SuccessCreateUser } from ".";
import { IDataResponse } from "../../repository";

describe("SuccessCreateUser", () => {
  test("should always return a date other than null", async () => {
    const data: IDataResponse = {
      id: "1",
      name: "John Doe",
      email: "jhon@gmail.com",
      password_hash: "67c89asca123456cascasc51c65as",
      created_at: new Date(),
    };

    const newUser = new SuccessCreateUser().execute(data);

    expect(newUser.data).not.toBe(null);
  });

  test("should always return an object with the following format", async () => {
    const data: IDataResponse = {
      id: new Date().getTime().toString(),
      name: "John Doe",
      email: "jhon@gmail.com",
      password_hash: "67c89asca123456cascasc51c65as",
      created_at: new Date(),
    };

    const newUser = new SuccessCreateUser().execute(data);

    expect(newUser).toEqual({
      data: {
        id: expect.any(String),
        name: "John Doe",
        email: "jhon@gmail.com",
        password_hash: expect.any(String),
        created_at: expect.any(Date),
      },
      message: {
        en: "User created successfully",
        pt: "Usuário criado com sucesso",
      },
      typeMessage: "success",
      statusCode: 201,
      error: null,
    });
  });
});
