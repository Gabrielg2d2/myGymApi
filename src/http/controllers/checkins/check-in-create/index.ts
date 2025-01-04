import {
  CheckInDomain,
  IDataRequest as IDataCreateCheckInRequest,
} from "@/domain/checkins/main";
import { GymsDomain } from "@/domain/gyms/main";
import { FastifyReply, FastifyRequest } from "fastify";

export async function checkInCreateController(
  request: FastifyRequest<{ Body: IDataCreateCheckInRequest }>,
  reply: FastifyReply
) {
  const domainGyms = new GymsDomain();
  const domainCheckIn = new CheckInDomain();

  const result = await domainCheckIn.create(domainGyms.findGym, request.body);

  return reply.status(result.statusCode).send(result);
}
