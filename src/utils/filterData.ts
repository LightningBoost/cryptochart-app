import dayjs, {Dayjs} from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import {
  BarDatasets,
  BarValue,
  CandleStickDatasets,
  CandleStickValue,
  LineDatasets,
  LineValues,
} from '../generated/graphql';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface IFilterData {
  dataSet: CandleStickDatasets[] | BarDatasets[] | LineDatasets[];
  initialDate: Dayjs;
  finalDate: Dayjs;
}

const filterData = ({
  dataSet,
  initialDate,
  finalDate,
}: IFilterData): {
  values: (CandleStickValue | BarValue | LineValues)[];
  label: string;
}[] => {
  return dataSet.map((ds) => ({
    label: ds.label,
    values: (ds.values as (CandleStickValue | BarValue | LineValues)[]).filter(
      (value) =>
        dayjs(parseInt(value.x, 10)).isSameOrAfter(dayjs(initialDate)) &&
        dayjs(parseInt(value.x, 10)).isSameOrBefore(dayjs(finalDate)),
    ),
  }));
};

export default filterData;
