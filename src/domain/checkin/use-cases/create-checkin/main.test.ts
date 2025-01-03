import { beforeEach, describe, expect, test, vitest } from "vitest";
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
      error: null,
      statusCode: 201,
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
});
