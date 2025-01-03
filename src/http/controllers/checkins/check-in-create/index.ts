import {
  CheckInDomain,
  IDataRequest as IDataCreateCheckInRequest,
} from "@/domain/checkins/main";
import { FastifyReply, FastifyRequest } from "fastify";

export async function checkInCreateController(
  request: FastifyRequest<{ Body: IDataCreateCheckInRequest }>,
  reply: FastifyReply
) {
  const domainCheckIn = new CheckInDomain();

  const result = await domainCheckIn.create(request.body);

  return reply.status(result.statusCode).send(result);
}
