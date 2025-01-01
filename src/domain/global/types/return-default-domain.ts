import { ITypeMessageGlobal } from "./type-message";

export type IReturnDefaultDomainGlobal<D> = {
  data: D;
  message: {
    en: string;
    pt: string;
  };
  typeMessage: ITypeMessageGlobal;
  statusCode: number;
  error: unknown;
};
