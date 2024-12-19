import { UsersDomain } from "@/domain/users/main";
import { ICreateUserUseCase } from "@/domain/users/use-cases/create-user";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createUserController(
  request: FastifyRequest<{ Body: ICreateUserUseCase }>,
  reply: FastifyReply
) {
  const usersDomain = new UsersDomain();

  const result = await usersDomain.createUser(request.body);

  return reply.status(result.statusCode).send(result);
}
