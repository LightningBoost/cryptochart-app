import {gql} from '@apollo/client';

const chartQueries = gql`
  query getData(
    $exchange: Exchanges!
    $interval: Interval!
    $symbol: String!
    $queryData: [ChartQuery!]!
    $ema: [Int!]
  ) {
    chart(
      exchange: $exchange
      interval: $interval
      symbol: $symbol
      queryData: $queryData
      ema: $ema
    ) {
      candleData {
        values {
          x
          high
          low
          open
          close
          volume
        }
        label
      }
      volume {
        values {
          x
          y
        }
        label
      }
      ema {
        dataSets {
          values {
            x
            y
          }
          label
          color
        }
      }
      bollingerBands {
        dataSets {
          values {
            x
            y
          }
          label
          color
        }
      }
      macd {
        dataSets {
          values {
            x
            y
          }
          label
          color
        }
      }
    }
    ticker24h(exchange: $exchange, symbol: $symbol) {
      openTime
      closeTime
      openPrice
      lastPrice
      highPrice
      lowPrice
      volume
      priceChange
      priceChangePercent
    }
  }
`;

export default chartQueries;
