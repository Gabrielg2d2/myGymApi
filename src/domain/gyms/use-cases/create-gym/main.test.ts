import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
  vitest,
} from "vitest";
import { RepositoryGyms } from "../../repositories/repository";
import { RepositoryGymsTest } from "../../repositories/repository-test";
import { CreateGymUseCase } from "./main";

class makeSutCreateGymUseCase {
  static execute(isError = false) {
    if (isError) {
      const repositoryTest = {
        execute: vitest
          .fn()
          .mockRejectedValueOnce(new Error("Unexpect: unknown error")),
      } as unknown as RepositoryGyms;
      return new CreateGymUseCase(repositoryTest);
    }

    const repositoryTest =
      new RepositoryGymsTest() as unknown as RepositoryGyms;
    return new CreateGymUseCase(repositoryTest);
  }
}

describe("CreateGymUseCase", () => {
  let sut: CreateGymUseCase;

  beforeEach(() => {
    sut = makeSutCreateGymUseCase.execute();

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("should create new gym", async () => {
    const result = await sut.execute({
      title: "Academia Teste",
      description: "Academia Teste",
      latitude: -23.5505199,
      longitude: -46.6333094,
      phone: "11999999999",
    });

    expect(result).toEqual({
      data: {
        gym: {
          id: expect.any(String),
          title: "Academia Teste",
          latitude: -23.5505199,
          longitude: -46.6333094,
          phone: "11999999999",
          description: "Academia Teste",
          created_at: expect.any(Date),
        },
      },
      message: {
        en: "Gym created successfully",
        pt: "Academia criada com sucesso",
      },
      typeMessage: "success",
      statusCode: 201,
      error: null,
    });
  });

  test("should return error when try create new gym", async () => {
    sut = makeSutCreateGymUseCase.execute(true);

    const result = await sut.execute({
      title: "Academia Teste",
      description: "Academia Teste",
      latitude: -23.5505199,
      longitude: -46.6333094,
      phone: "11999999999",
    });

    expect(result).toEqual({
      data: null,
      message: {
        en: "Service unavailable, try again later",
        pt: "Serviço indisponível, tente novamente mais tarde",
      },
      typeMessage: "fatal",
      statusCode: 500,
      error: "this.repository.create is not a function",
    });
  });
});
