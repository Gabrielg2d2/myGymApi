import { FastifyInstance } from "fastify";
import { checkInCreateController } from "../controllers/checkins/check-in-create";
import { authenticateUserController } from "../controllers/users/authenticate-user";
import { createUserController } from "../controllers/users/create-user";
import { getProfileController } from "../controllers/users/get-user-profile";

export async function appRoutes(app: FastifyInstance): Promise<void> {
  app.post("/users/create", createUserController);
  app.post("/users/session", authenticateUserController);
  app.get("/users/profile/:userId", getProfileController);
  app.post("/checkin/create", checkInCreateController);
}
