import { IGymGlobal } from "@/domain/@global/types/gym";
import { randomUUID } from "node:crypto";
import { IDataRequest, IRepositoryGyms } from "../interface";

export class RepositoryGymsTest implements IRepositoryGyms {
  private listGyms: IGymGlobal[] = [];

  async create(data: IDataRequest) {
    const newGym = {
      id: randomUUID(),
      title: data.title,
      latitude: data.latitude,
      longitude: data.longitude,
      phone: data.phone,
      description: data.description,
      created_at: new Date(),
    };

    this.listGyms.push(newGym);

    return newGym;
  }
  async findById(id: string) {
    const gym = this.listGyms.find((gym) => gym.id === id);

    if (!gym) return null;

    return gym;
  }
}
