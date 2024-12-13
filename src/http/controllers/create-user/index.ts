import { createUserUseCase } from "@/use-cases/create-user";
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

  try {
    await createUserUseCase({
      name,
      email,
      password,
    });
  } catch (error) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
