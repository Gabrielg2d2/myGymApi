import { CustomErrorGlobal } from "@/domain/global/class/errors/custom";
import { IDataResponse } from "../../repository/interface";

export class ServiceUserExists {
  async execute(user: IDataResponse) {
    if (!user?.id && !user?.created_at) {
      throw new CustomErrorGlobal({
        message: "Error: User not found",
      });
    }
  }
}
