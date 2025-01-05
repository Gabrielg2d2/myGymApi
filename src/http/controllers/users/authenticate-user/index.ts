import { IDataAuthenticateRequest, UsersDomain } from "@/domain/users/main";
import { FastifyReply, FastifyRequest } from "fastify";

export async function authenticateUserController(
  request: FastifyRequest<{ Body: IDataAuthenticateRequest }>,
  reply: FastifyReply
) {
  const domain = new UsersDomain();

  const result = await domain.authenticateUser(request.body);

  return reply.status(result.statusCode).send(result);
}
