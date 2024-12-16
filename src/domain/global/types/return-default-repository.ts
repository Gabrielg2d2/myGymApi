import { ITypeMessageGlobal } from "./type-message";

export type IReturnDefaultRepository<D> = Promise<{
  data: D;
  message: {
    en: string;
    pt: string;
  };
  typeMessage: ITypeMessageGlobal;
}>;
