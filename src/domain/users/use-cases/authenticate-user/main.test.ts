import { env } from "@/env";
import bcryptjs from "bcryptjs";
import { describe, expect, test } from "vitest";
import { AuthenticateUserUseCase } from "./main";
import { RepositoryAuthenticateUser } from "./repository";

describe("AuthenticateUserUseCase", () => {
  test("should authenticate user", async () => {
    const passwordHash = await bcryptjs.hash("123123", env.HASH_SALT);

    const mockRepository = {
      execute: async () => {
        return {
          id: new Date().getTime().toString(),
          name: "Test",
          email: "test@gmail.com",
          password_hash: passwordHash,
          created_at: new Date(),
        };
      },
    } as unknown as RepositoryAuthenticateUser;

    const sut = new AuthenticateUserUseCase(mockRepository);

    const result = await sut.execute({
      email: "test@gmail.com",
      password: "123123",
    });

    expect(result.statusCode).toBe(200);
  });
});
