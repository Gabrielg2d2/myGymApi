export class CustomErrorGlobal extends Error {
  constructor(message: string, private readonly details: unknown = undefined) {
    super(message);
    this.details = details;
  }
}
