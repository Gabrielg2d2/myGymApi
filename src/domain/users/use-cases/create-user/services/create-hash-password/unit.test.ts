import { compare } from "bcryptjs";
import { describe, expect, test } from "vitest";
import { ServiceCreateHashPassword } from ".";

describe("ServiceCreateHashPassword", async () => {
  test("should return a hashed password", async () => {
    const password = "1235678";
    const hashedPassword = await new ServiceCreateHashPassword().execute(
      password
    );

    const isHashed = await compare(password, hashedPassword);

    expect(isHashed).toBe(true);
    expect(hashedPassword).toEqual(expect.any(String));
    expect(hashedPassword).not.toEqual(password);
  });

  test("should return an error 'Password is required'", async () => {
    const passwordEmpty = "";
    await expect(
      new ServiceCreateHashPassword().execute(passwordEmpty)
    ).rejects.toThrow("Password is required");
  });

  test("should return an error 'Password must be at least 6 characters'", async () => {
    const password = "123";
    await expect(
      new ServiceCreateHashPassword().execute(password)
    ).rejects.toThrow("Password must be at least 6 characters");
  });
});
