import { IDataCreateUserRequest, UsersDomain } from "@/domain/users/main";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createUserController(
  request: FastifyRequest<{ Body: IDataCreateUserRequest }>,
  reply: FastifyReply
) {
  const domain = new UsersDomain();

  const result = await domain.createUser(request.body);

  return reply.status(result.statusCode).send(result);
}
