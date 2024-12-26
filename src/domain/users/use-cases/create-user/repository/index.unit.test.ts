import { describe, expect, test, vitest } from "vitest";
import { RepositoryCreateUser } from ".";
import { AdapterRepositoryCreateUser } from "../adapters/repository/create-user";

describe("RepositoryCreateUser", () => {
  describe("Success", () => {
    test("should return a new user", async () => {
      const mockAdapter = {
        userFindUnique: () => null,
        userCreate: () => ({
          id: "123456",
          name: "John Doe",
          email: "jhon@gmail.com",
          password_hash: "12c1sa981c98asc13456",
          created_at: new Date(),
        }),
      } as unknown as AdapterRepositoryCreateUser;
      const sut = new RepositoryCreateUser(mockAdapter);

      const newUser = await sut.execute({
        name: "John Doe",
        email: "jhon@gmail.com",
        password: "123456",
      });

      expect(newUser).toEqual({
        id: "123456",
        name: "John Doe",
        email: "jhon@gmail.com",
        password_hash: "12c1sa981c98asc13456",
        created_at: expect.any(Date),
      });
    });
  });

  describe("Error", () => {
    test("should return an error if the user already exists", async () => {
      const mockAdapter = {
        userFindUnique: () => ({
          id: "123456",
          name: "John Doe",
          email: "jhon@gmail.com",
          password_hash: "12c1sa981c98asc13456",
          created_at: new Date(),
        }),
        userCreate: () => vitest.fn(),
      } as unknown as AdapterRepositoryCreateUser;
      const sut = new RepositoryCreateUser(mockAdapter);

      await expect(
        sut.execute({
          name: "John Doe",
          email: "jhon@gmail.com",
          password: "123456",
        })
      ).rejects.toThrow("Error: User already exists");
    });

    test("should return an error if an unexpected error occurs", async () => {
      const mockAdapter = {
        userFindUnique: () => {
          throw new Error("Unexpected error");
        },
        userCreate: () => vitest.fn(),
      } as unknown as AdapterRepositoryCreateUser;
      const sut = new RepositoryCreateUser(mockAdapter);

      await expect(
        sut.execute({
          name: "John Doe",
          email: "jhon@gmail.com",
          password: "123456",
        })
      ).rejects.toThrow("Unexpected error");
    });
  });
});
