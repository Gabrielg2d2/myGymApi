import { IDataGetProfileRequest, UsersDomain } from "@/domain/users/main";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getProfileController(
  request: FastifyRequest<{ Params: IDataGetProfileRequest }>,
  reply: FastifyReply
) {
  const domain = new UsersDomain();

  const result = await domain.getProfile({ userId: request.params.userId });

  return reply.status(result.statusCode).send(result);
}
