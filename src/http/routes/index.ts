import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/create-user";

export async function appRoutes(app: FastifyInstance): Promise<void> {
  app.post("/users", createUserController);
}