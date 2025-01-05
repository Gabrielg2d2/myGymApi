import * as bcryptjs from 'bcryptjs';

export class AdapterBcryptjs {
  constructor(private readonly _bcryptjs = bcryptjs) {}

  get bcryptjs() {
    return this._bcryptjs;
  }
}
