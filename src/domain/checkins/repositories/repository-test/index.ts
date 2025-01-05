import { AdapterDayjs } from '@/domain/@adapters/date/dayjs';
import { randomUUID } from 'node:crypto';
import { ICheckIn, IDataRequest, IRepositoryCheckIn } from '../interface';

export class RepositoryCheckInTest implements IRepositoryCheckIn {
  private listCheckIn: ICheckIn[] = [];

  constructor(private readonly adapterDate = new AdapterDayjs()) {}

  async create(data: IDataRequest) {
    const checkIn: ICheckIn = {
      id: randomUUID(),
      created_at: new Date(),
      user_id: data.userId,
      gym_id: data.gymId,
      validated_at: null,
    };

    this.listCheckIn.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = this.adapterDate.dayjs(date).startOf('date');
    const endOfTheDay = this.adapterDate.dayjs(date).endOf('date');

    const checkInOnSomeDate = this.listCheckIn.find((checkIn) => {
      const checkInDate = this.adapterDate.dayjs(checkIn.created_at);
      const isOnSameDay =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDay;
    });

    if (!checkInOnSomeDate) return null;

    return checkInOnSomeDate;
  }
}
