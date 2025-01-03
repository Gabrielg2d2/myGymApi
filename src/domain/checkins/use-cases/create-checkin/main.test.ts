import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
  vitest,
} from "vitest";
import { RepositoryCheckIn } from "../../repositories/repository";
import { RepositoryCheckInTest } from "../../repositories/repository-test";
import { CreateCheckInUseCase } from "./main";

class makeSutCreateCheckInUseCase {
  static execute(isError = false) {
    if (isError) {
      const repositoryTest = {
        execute: vitest
          .fn()
          .mockRejectedValueOnce(new Error("Unexpect: unknown error")),
      } as unknown as RepositoryCheckIn;
      return new CreateCheckInUseCase(repositoryTest);
    }

    const repositoryTest =
      new RepositoryCheckInTest() as unknown as RepositoryCheckIn;
    return new CreateCheckInUseCase(repositoryTest);
  }
}

describe("CreateCheckInUseCase", () => {
  let sut: CreateCheckInUseCase;

  beforeEach(() => {
    sut = makeSutCreateCheckInUseCase.execute();

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("should create a check-in", async () => {
    const result = await sut.execute({ gymId: "123", userId: "123" });

    expect(result).toEqual({
      data: {
        checkIn: {
          id: expect.any(String),
          validated_at: null,
          created_at: new Date(),
          user_id: "123",
          gym_id: "123",
        },
      },
      message: {
        en: "Check-in created successfully",
        pt: "Check-in criado com sucesso",
      },
      typeMessage: "success",
      statusCode: 201,
      error: null,
    });
  });

  test("should return an unknown error", async () => {
    const sutWithError = makeSutCreateCheckInUseCase.execute(true);

    const result = await sutWithError.execute({
      gymId: "123",
      userId: "123",
    });

    expect(result).toEqual({
      data: null,
      message: {
        en: "Service unavailable, try again later",
        pt: "Serviço indisponível, tente novamente mais tarde",
      },
      typeMessage: "fatal",
      error: expect.any(String),
      statusCode: 500,
    });
  });

  test("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date("2025-01-09T12:00:00Z"));

    await sut.execute({ gymId: "123", userId: "123" });

    const result = await sut.execute({ gymId: "123", userId: "123" });

    expect(result).toEqual({
      data: null,
      message: {
        en: "You have already checked in today",
        pt: "Você já fez check-in hoje",
      },
      typeMessage: "warning",
      statusCode: 400,
      error: null,
    });
  });

  test("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date("2025-01-09T12:00:00Z"));

    await sut.execute({ gymId: "123", userId: "123" });

    vi.setSystemTime(new Date("2025-01-10T12:00:00Z"));

    const result = await sut.execute({ gymId: "123", userId: "123" });

    expect(result).toEqual({
      data: {
        checkIn: {
          id: expect.any(String),
          validated_at: null,
          created_at: new Date(),
          user_id: "123",
          gym_id: "123",
        },
      },
      message: {
        en: "Check-in created successfully",
        pt: "Check-in criado com sucesso",
      },
      typeMessage: "success",
      statusCode: 201,
      error: null,
    });
  });
});
