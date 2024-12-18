import { ITypeMessageGlobal } from "./type-message";

export type IReturnDefaultDomain<D> = Promise<{
  data: D | null;
  message: {
    en: string;
    pt: string;
  };
  typeMessage: ITypeMessageGlobal;
  statusCode: number;
}>;
