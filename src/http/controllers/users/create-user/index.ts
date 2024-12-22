import { IDataCreateUserRequest, UsersDomain } from "@/domain/users/main";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createUserController(
  request: FastifyRequest<{ Body: IDataCreateUserRequest }>,
  reply: FastifyReply
) {
  const usersDomain = new UsersDomain();

  const result = await usersDomain.createUser(request.body);

  return reply.status(result.statusCode).send(result);
}
