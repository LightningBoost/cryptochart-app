import {createContext} from 'react';
import {Candles, Ticker24h} from '../../generated/graphql';

export interface ChartContextData {
  data:
    | {
        candleOHLC: Candles[];
      }
    | undefined;
}

export const chartContextDefaultValue: ChartContextData = {
  data: undefined,
};

export const ChartContext = createContext<ChartContextData>(
  chartContextDefaultValue,
);
