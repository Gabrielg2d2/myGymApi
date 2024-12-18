import { ITypeMessageGlobal } from "./type-message";

export type IReturnDefaultDomain<D> = {
  data: D | null;
  message: {
    en: string;
    pt: string;
  };
  typeMessage: ITypeMessageGlobal;
  statusCode: number;
  error: unknown;
};
