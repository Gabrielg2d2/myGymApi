import { CustomErrorGlobal } from "@/domain/@global/class/errors/custom";
import { IGymGlobal } from "../../repositories/repository";

export class ServiceGymAlreadyExistsError {
  async execute(gym: IGymGlobal | null) {
    if (!gym?.id)
      throw new CustomErrorGlobal({
        message: "Error: Gym not found",
      });
  }
}
