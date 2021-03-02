import {createContext} from 'react';
import {ApolloError, ApolloQueryResult} from '@apollo/client';
import {Candles, QueryCandleOhlcArgs, Ticker24h} from '../../generated/graphql';

export interface ChartContextData {
  data:
    | {
        candleOHLC: Candles[] | undefined;
        ticker24h: Ticker24h | undefined;
      }
    | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  fetchData?: (
    variables?: Partial<QueryCandleOhlcArgs> | undefined,
  ) => Promise<ApolloQueryResult<{candleOHLC: Candles[]}>>;
}

export const chartContextDefaultValue: ChartContextData = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const ChartContext = createContext<ChartContextData>(
  chartContextDefaultValue,
);
