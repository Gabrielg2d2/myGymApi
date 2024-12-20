type IPropsConstructor = {
  message: string;
  details?: unknown;
  body?: unknown;
};

export class CustomErrorGlobal extends Error {
  public details: unknown;
  public body?: unknown;

  constructor({ message, details, body }: IPropsConstructor) {
    super(message);
    this.details = details;
    this.body = body;
  }
}
