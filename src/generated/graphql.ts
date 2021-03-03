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

export type Query = {
  __typename?: 'Query';
  candleOHLC: Array<Candles>;
  ticker24h: Ticker24h;
};


export type QueryCandleOhlcArgs = {
  exchange: Exchanges;
  interval: Interval;
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

export type Candles = {
  __typename?: 'Candles';
  timestamp: Scalars['Float'];
  open: Scalars['String'];
  high: Scalars['String'];
  low: Scalars['String'];
  close: Scalars['String'];
  volume: Scalars['String'];
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
