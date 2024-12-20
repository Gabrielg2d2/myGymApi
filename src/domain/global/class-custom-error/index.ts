type IPropsConstructor = {
  message: string;
  details?: unknown;
  name?: string;
  body?: unknown;
};

export class CustomErrorGlobal extends Error {
  public details: unknown;
  public name: string;
  public body?: unknown;

  constructor({ message, details, name = "Error", body }: IPropsConstructor) {
    super(message);
    this.name = name;
    this.details = details;
    this.body = body;
  }
}
