import { IGymGlobal } from "@/domain/@global/types/gym";
import { IReturnDefaultDomainGlobal } from "@/domain/@global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/@global/types/type-message";

interface ISuccessCreateCheckIn {
  execute(data: IGymGlobal | null): Promise<
    IReturnDefaultDomainGlobal<{
      gym: IGymGlobal;
    }>
  >;
}

export class SuccessCreateCheckIn implements ISuccessCreateCheckIn {
  async execute(data: IGymGlobal | null) {
    if (!data?.id) {
      throw new Error("Unexpected: Data is required");
    }

    return {
      data: {
        gym: data,
      },
      message: {
        en: "Gym created successfully",
        pt: "Academia criada com sucesso",
      },
      typeMessage: ITypeMessageGlobal.SUCCESS,
      statusCode: 201,
      error: null,
    };
  }
}
