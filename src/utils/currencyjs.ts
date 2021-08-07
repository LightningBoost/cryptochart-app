import currency from 'currency.js';
import dayjs from 'dayjs';

interface IOptions {
  symbol?: string;
  separator?: string;
  decimal?: string;
  errorOnInvalid?: boolean;
  precision?: number;
  increment?: number;
  useVedic?: boolean;
  pattern?: string;
  negativePattern?: string;
  format?: currency.Format;
  fromCents?: boolean;
}

const locale = dayjs.locale();

const Currency = (value: currency.Any, options?: IOptions): currency => {
  if (locale !== 'en') {
    return currency(value, {decimal: ',', separator: '.', ...options});
  }
  return currency(value, {...options});
};

export default Currency;
