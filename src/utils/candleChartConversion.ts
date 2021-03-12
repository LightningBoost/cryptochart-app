import dayjs from 'dayjs';
import {CandleStickValue} from '../generated/graphql';

const generateMarker = (d: CandleStickValue) =>
  `${dayjs(d.timestamp).format('lll')}\n\n${'O:'} ${d.open.toFixed(
    2,
  )}\n${'H:'} ${d.shadowH.toFixed(2)}\n${'L:'} ${d.shadowL.toFixed(
    2,
  )}\n${'C:'} ${d.close.toFixed(2)}\n${'Vol:'} ${parseInt(d.volume, 10)} BTC`;

export default generateMarker;
