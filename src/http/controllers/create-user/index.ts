import { UsersDomain } from "@/domain/users/main";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  const usersDomain = new UsersDomain();

  try {
    await usersDomain.createUser({ name, email, password });
  } catch (error) {
    console.error(error);
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
