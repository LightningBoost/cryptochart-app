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

export enum Exchanges {
  Binance = 'binance'
}

export type Query = {
  __typename?: 'Query';
  candleOHLC: Array<Candles>;
};


export type QueryCandleOhlcArgs = {
  exchange: Exchanges;
  interval: Scalars['Int'];
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
