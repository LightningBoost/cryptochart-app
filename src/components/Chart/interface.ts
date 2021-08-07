import {LineDatasets} from '../../generated/graphql';

export interface ILineChart {
  data: LineDatasets[];
  maxima: number;
  minima: number;
}
