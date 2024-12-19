import { ITypeMessageGlobal } from "./type-message";

export type IReturnDefaultDomain<D> = {
  data: D;
  message: {
    en: string;
    pt: string;
  };
  typeMessage: ITypeMessageGlobal;
  statusCode: number;
  error: unknown;
};
