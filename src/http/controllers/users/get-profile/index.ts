import { UsersDomain } from "@/domain/users/main";
import { FastifyReply, FastifyRequest } from "fastify";

type IParams = {
  id: string;
};

export async function getProfileController(
  request: FastifyRequest<{ Params: IParams }>,
  reply: FastifyReply
) {
  const domain = new UsersDomain();

  const result = await domain.getProfile({ userId: request.params.id });

  return reply.status(result.statusCode).send(result);
}
