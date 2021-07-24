import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};


export type BarData = {
  __typename?: 'BarData';
  dataSets: BarDataset;
};

export type BarDataset = {
  __typename?: 'BarDataset';
  label: Scalars['String'];
  values: Array<BarValue>;
};

export type BarValue = {
  __typename?: 'BarValue';
  x: Scalars['String'];
  y: Scalars['Float'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CandleStickData = {
  __typename?: 'CandleStickData';
  dataSets: CandleStickDataset;
};

export type CandleStickDataset = {
  __typename?: 'CandleStickDataset';
  label: Scalars['String'];
  values: Array<CandleStickValue>;
};

export type CandleStickValue = {
  __typename?: 'CandleStickValue';
  x: Scalars['String'];
  high: Scalars['Float'];
  low: Scalars['Float'];
  open: Scalars['Float'];
  close: Scalars['Float'];
  volume: Scalars['String'];
};

export enum ChartQuery {
  Candlestick = 'CANDLESTICK',
  Volume = 'VOLUME',
  Ema = 'EMA',
  Bollingerbands = 'BOLLINGERBANDS'
}

export type CombinedData = {
  __typename?: 'CombinedData';
  lineData?: Maybe<LineData>;
  barData?: Maybe<BarData>;
  candleData: CandleStickData;
};

export enum Exchanges {
  Binance = 'binance'
}

export enum Interval {
  M1 = 'm1',
  M3 = 'm3',
  M5 = 'm5',
  M15 = 'm15',
  M30 = 'm30',
  H1 = 'h1',
  H2 = 'h2',
  H4 = 'h4',
  H6 = 'h6',
  H8 = 'h8',
  H12 = 'h12',
  D1 = 'd1'
}

export type LineData = {
  __typename?: 'LineData';
  dataSets: Array<LineDatasets>;
};

export type LineDatasets = {
  __typename?: 'LineDatasets';
  label: Scalars['String'];
  values: Array<LineValues>;
};

export type LineValues = {
  __typename?: 'LineValues';
  x: Scalars['String'];
  y: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  chart: CombinedData;
  ticker24h: Ticker24h;
};


export type QueryChartArgs = {
  exchange: Exchanges;
  interval: Interval;
  symbol: Scalars['String'];
  queryData: Array<ChartQuery>;
  ema?: Maybe<Array<Scalars['Int']>>;
};


export type QueryTicker24hArgs = {
  exchange: Exchanges;
  symbol: Scalars['String'];
};

export type Ticker24h = {
  __typename?: 'Ticker24h';
  priceChange: Scalars['String'];
  priceChangePercent: Scalars['String'];
  openPrice: Scalars['String'];
  lastPrice: Scalars['String'];
  highPrice: Scalars['String'];
  lowPrice: Scalars['String'];
  volume: Scalars['String'];
  openTime: Scalars['Float'];
  closeTime: Scalars['Float'];
};
