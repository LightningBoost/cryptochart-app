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


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export enum Exchanges {
  Binance = 'binance'
}

export enum ChartQuery {
  Candlestick = 'CANDLESTICK',
  Volume = 'VOLUME',
  Ema = 'EMA'
}

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
};


export type QueryTicker24hArgs = {
  exchange: Exchanges;
  symbol: Scalars['String'];
};

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

export enum AxisDependency {
  Left = 'LEFT',
  Right = 'RIGHT'
}

export type CommonDatasetConfig = {
  __typename?: 'CommonDatasetConfig';
  drawValues: Scalars['Boolean'];
  axisDependency: AxisDependency;
  shadowWidth?: Maybe<Scalars['Float']>;
  shadowColor?: Maybe<Scalars['String']>;
  shadowColorSameAsCandle?: Maybe<Scalars['Boolean']>;
  decreasingColor?: Maybe<Scalars['String']>;
  increasingColor?: Maybe<Scalars['String']>;
  decreasingPaintStyle?: Maybe<CandleStickPaintStyle>;
  increasingPaintStyle?: Maybe<CandleStickPaintStyle>;
};

export type Values = {
  __typename?: 'Values';
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
  marker: Scalars['String'];
};

export type Candles = {
  __typename?: 'Candles';
  timestamp: Scalars['Float'];
  open: Scalars['String'];
  high: Scalars['String'];
  low: Scalars['String'];
  close: Scalars['String'];
  volume: Scalars['String'];
};

export type DataConfig = {
  __typename?: 'DataConfig';
  mode?: Maybe<ConfigMode>;
  drawCircles?: Maybe<Scalars['Boolean']>;
  color: Scalars['String'];
  barWidth?: Maybe<Scalars['Float']>;
};

export type CombinedData = {
  __typename?: 'CombinedData';
  lineData?: Maybe<LineData>;
  barData?: Maybe<BarData>;
  candleData?: Maybe<CandleStickData>;
};

export enum ConfigMode {
  Linear = 'LINEAR',
  Stepped = 'STEPPED',
  CubicBezier = 'CUBIC_BEZIER',
  HorizontalBezier = 'HORIZONTAL_BEZIER'
}

export type LineDatasets = {
  __typename?: 'LineDatasets';
  values: Array<Values>;
  config: DataConfig;
};

export type LineData = {
  __typename?: 'LineData';
  dataSets: Array<LineDatasets>;
};

export enum CandleStickPaintStyle {
  Fill = 'FILL',
  Stroke = 'STROKE',
  FillAndStroke = 'FILL_AND_STROKE'
}

export type CandleStickValue = {
  __typename?: 'CandleStickValue';
  x?: Maybe<Scalars['Float']>;
  timestamp: Scalars['Float'];
  shadowH: Scalars['Float'];
  shadowL: Scalars['Float'];
  open: Scalars['Float'];
  close: Scalars['Float'];
  marker: Scalars['String'];
  volume: Scalars['String'];
};

export type CandleStickDataset = {
  __typename?: 'CandleStickDataset';
  values: Array<CandleStickValue>;
  label: Scalars['String'];
  config: CommonDatasetConfig;
};

export type CandleStickData = {
  __typename?: 'CandleStickData';
  dataSets: Array<CandleStickDataset>;
};

export type BarDatasets = {
  __typename?: 'BarDatasets';
  values: Array<Values>;
};

export type BarData = {
  __typename?: 'BarData';
  dataSets: Array<BarDatasets>;
  config?: Maybe<DataConfig>;
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
