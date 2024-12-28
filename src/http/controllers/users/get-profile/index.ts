import { IDataGetProfileRequest, UsersDomain } from "@/domain/users/main";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getProfileController(
  request: FastifyRequest<{ Body: IDataGetProfileRequest }>,
  reply: FastifyReply
) {
  const domain = new UsersDomain();

  const result = await domain.getProfile(request.body);

  return reply.status(result.statusCode).send(result);
}
