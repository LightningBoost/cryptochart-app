import dayjs, {Dayjs} from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import {
  BarDataset,
  BarValue,
  CandleStickDataset,
  CandleStickValue,
  LineDatasets,
} from '../generated/graphql';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface IFilterData {
  dataSet: CandleStickDataset | BarDataset;
  initialDate: Dayjs;
  finalDate: Dayjs;
}

interface IFilterLinesData {
  dataSet: LineDatasets[];
  initialDate: Dayjs;
  finalDate: Dayjs;
}

interface IFilterBarData {
  dataSet: BarDataset;
  initialDate: Dayjs;
  finalDate: Dayjs;
}

export const filterData = ({
  dataSet,
  initialDate,
  finalDate,
}: IFilterData): {
  values: (CandleStickValue | BarValue)[];
  label: string;
} => {
  return {
    label: dataSet.label,
    values: (dataSet.values as (CandleStickValue | BarValue)[]).filter(
      (value) =>
        dayjs(parseInt(value.x, 10)).isSameOrAfter(dayjs(initialDate)) &&
        dayjs(parseInt(value.x, 10)).isSameOrBefore(dayjs(finalDate)),
    ),
  };
};

export const filterLinesData = ({
  dataSet,
  initialDate,
  finalDate,
}: IFilterLinesData): LineDatasets[] => {
  return dataSet.map((ds) => ({
    label: ds.label,
    values: ds.values.filter(
      (value) =>
        dayjs(parseInt(value.x, 10)).isSameOrAfter(dayjs(initialDate)) &&
        dayjs(parseInt(value.x, 10)).isSameOrBefore(dayjs(finalDate)),
    ),
    color: ds.color,
  }));
};

export const filterBarData = ({
  dataSet,
  initialDate,
  finalDate,
}: IFilterBarData): BarDataset => {
  return {
    label: dataSet.label,
    values: dataSet.values.filter(
      (value) =>
        dayjs(parseInt(value.x, 10)).isSameOrAfter(dayjs(initialDate)) &&
        dayjs(parseInt(value.x, 10)).isSameOrBefore(dayjs(finalDate)),
    ),
  };
};
