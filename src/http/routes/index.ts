import { FastifyInstance } from "fastify";
import { authenticateUserController } from "../controllers/users/authenticate-user";
import { createUserController } from "../controllers/users/create-user";

export async function appRoutes(app: FastifyInstance): Promise<void> {
  app.post("/users", createUserController);
  app.post("/session", authenticateUserController);
}
