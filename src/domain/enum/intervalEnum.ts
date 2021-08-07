import {OpUnitType} from 'dayjs';

import {Interval} from '../../generated/graphql';

const intervalEnum = (
  periodicity: Interval,
): {time: number; period: OpUnitType} => {
  switch (periodicity) {
    case Interval.M1:
      return {
        time: 1,
        period: 'minute',
      };
    case Interval.M3:
      return {
        time: 3,
        period: 'minutes',
      };
    case Interval.M5:
      return {
        time: 5,
        period: 'minutes',
      };
    case Interval.M15:
      return {
        time: 15,
        period: 'minutes',
      };
    case Interval.M30:
      return {
        time: 30,
        period: 'minutes',
      };
    case Interval.H1:
      return {
        time: 1,
        period: 'hour',
      };
    case Interval.H2:
      return {
        time: 2,
        period: 'hours',
      };
    case Interval.H4:
      return {
        time: 4,
        period: 'hours',
      };
    case Interval.H6:
      return {
        time: 6,
        period: 'hours',
      };
    case Interval.H8:
      return {
        time: 8,
        period: 'hours',
      };
    case Interval.H12:
      return {
        time: 12,
        period: 'hours',
      };
    case Interval.D1:
      return {
        time: 1,
        period: 'day',
      };
    default:
      return {
        time: 1,
        period: 'minute',
      };
  }
};

export default intervalEnum;
