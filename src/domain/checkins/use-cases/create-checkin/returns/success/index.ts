import { IReturnDefaultDomainGlobal } from "@/domain/@global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/@global/types/type-message";
import { ICheckIn } from "../../../../repositories/repository";

interface ISuccessCreateCheckIn {
  execute(data: ICheckIn | null): Promise<
    IReturnDefaultDomainGlobal<{
      checkIn: ICheckIn;
    }>
  >;
}

export class SuccessCreateCheckIn implements ISuccessCreateCheckIn {
  async execute(data: ICheckIn | null) {
    if (!data?.id) {
      throw new Error("Unexpected: Data is required");
    }

    return {
      data: {
        checkIn: data,
      },
      message: {
        en: "Check-in created successfully",
        pt: "Check-in criado com sucesso",
      },
      typeMessage: ITypeMessageGlobal.SUCCESS,
      statusCode: 201,
      error: null,
    };
  }
}
