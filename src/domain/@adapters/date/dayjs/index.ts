import dayjs from "dayjs";

export class AdapterDayjs {
  constructor(private readonly _dayjs = dayjs) {}

  get dayjs() {
    return this._dayjs;
  }
}
