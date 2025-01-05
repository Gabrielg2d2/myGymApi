import { z } from 'zod';

export class AdapterZod {
  constructor(private readonly _z = z) {}

  get zod() {
    return this._z;
  }
}
