import {createContext} from 'react';
import {ApolloError, ApolloQueryResult} from '@apollo/client';
import {Candles, QueryCandleOhlcArgs} from '../../generated/graphql';

export interface ChartContextData {
  data: Candles[] | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  fetchData?: (
    variables?: Partial<QueryCandleOhlcArgs> | undefined,
  ) => Promise<ApolloQueryResult<{candleOHLC: Candles[]}>>;
}

export const chartContextDefaultValue: ChartContextData = {
  data: undefined,
  loading: true,
  error: undefined,
};

export const ChartContext = createContext<ChartContextData>(
  chartContextDefaultValue,
);
