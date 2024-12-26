import { AdapterBcryptjs } from "@/domain/adapters/hash/bcryptjs";
import { env } from "@/env";
import { describe, expect, test } from "vitest";
import { ServiceValidationAuthenticateUser } from ".";
import { IUser } from "../../repository/interface";

describe("ServiceValidationAuthenticateUser", () => {
  const adapter = new AdapterBcryptjs();

  describe("Success", () => {
    test("should return nothing if user is valid", async () => {
      const sut = new ServiceValidationAuthenticateUser();

      const password = "123456";
      const passwordHash = await adapter.bcryptjs.hash(password, 1);

      const user: IUser = {
        id: new Date().getTime().toString(),
        email: "jhon@gmail.com",
        name: "Jhon Doe",
        created_at: new Date(),
        password_hash: passwordHash,
      };

      await expect(sut.execute(user, password)).resolves.toBeUndefined();
    });
  });

  describe("Error", () => {
    test("should return an error if email is not provided", async () => {
      const sut = new ServiceValidationAuthenticateUser();

      const password = "123456";
      const passwordHash = await adapter.bcryptjs.hash(password, env.HASH_SALT);

      const user: IUser = {
        id: new Date().getTime().toString(),
        email: "",
        name: "Jhon Doe",
        created_at: new Date(),
        password_hash: passwordHash,
      };

      try {
        await sut.execute(user, password);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toBe("Error: Credentials are invalid");
        }
      }
    });

    test("should return an error if password is not provided", async () => {
      const sut = new ServiceValidationAuthenticateUser();
      const password = "123456";
      const passwordHash = await adapter.bcryptjs.hash(password, env.HASH_SALT);

      const user: IUser = {
        id: new Date().getTime().toString(),
        email: "jhon@gmail.com",
        name: "Jhon Doe",
        created_at: new Date(),
        password_hash: passwordHash,
      };

      try {
        await sut.execute(user, "");
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toBe("Error: Credentials are invalid");
        }
      }
    });

    test("should return an error if password or email is invalid", async () => {
      const sut = new ServiceValidationAuthenticateUser();
      const password = "123456";
      const passwordHash = await adapter.bcryptjs.hash(password, env.HASH_SALT);

      const user: IUser = {
        id: new Date().getTime().toString(),
        email: "jhon@gmail.com",
        name: "Jhon Doe",
        created_at: new Date(),
        password_hash: passwordHash,
      };

      try {
        await sut.execute(user, "12345675v1d56vs1v65");
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toBe("Error: Credentials are invalid");
        }
      }
    });
  });
});
