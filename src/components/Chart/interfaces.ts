import {Candles} from '../../generated/graphql';

export interface ICombinedChartProps {
  data: {
    candleStick?: Candles[];
  };
}
