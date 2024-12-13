import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
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

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    return reply.status(409).send();
  }

  const password_hash = await hash(password, 6);

  await prisma.user.create({
    data: { name, email, password_hash },
  });

  return reply.status(201).send();
}
