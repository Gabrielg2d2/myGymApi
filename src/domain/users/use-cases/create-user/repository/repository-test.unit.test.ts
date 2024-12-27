import { CustomErrorGlobal } from "@/domain/global/class/errors/custom";
import { beforeEach, describe, expect, test } from "vitest";
import { RepositoryTest } from "./repository-test";

describe("RepositoryTest", () => {
  let sut: RepositoryTest;

  beforeEach(() => {
    sut = new RepositoryTest();
  });

  test("should create a new user", async () => {
    const data = {
      name: "Maria Silva",
      email: "maria@example.com",
      password: "senha123",
    };

    const user = await sut.execute(data);

    expect(user).toHaveProperty("id");
    expect(user.name).toBe(data.name);
    expect(user.email).toBe(data.email);
    expect(user.password_hash).toBe(data.password);
    expect(user).toHaveProperty("created_at");
  });

  test("should throw an error if the user already exists", async () => {
    const data = {
      name: "João Souza",
      email: "joao@example.com",
      password: "senha456",
    };

    await sut.execute(data);

    await expect(sut.execute(data)).rejects.toBeInstanceOf(CustomErrorGlobal);
  });
});
