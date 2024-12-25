import { CustomErrorGlobal } from "@/domain/global/class-custom-error";
import { beforeEach, describe, expect, test } from "vitest";
import { RepositoryTest } from "./repository-test";

describe("RepositoryTest", () => {
  let repository: RepositoryTest;

  beforeEach(() => {
    repository = new RepositoryTest();
  });

  test("should create a new user", async () => {
    const data = {
      name: "Maria Silva",
      email: "maria@example.com",
      password: "senha123",
    };

    const user = await repository.execute(data);

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

    await repository.execute(data);

    await expect(repository.execute(data)).rejects.toBeInstanceOf(
      CustomErrorGlobal
    );
  });
});
