import {combineReducers} from 'redux';

import {bottomSheetReducer} from './bottomSheet/reducer';
import {chartReducer} from './chart/reducer';
import {themeReducer} from './theme/reducer';

const rootReducers = combineReducers({
  theme: themeReducer,
  bottomSheet: bottomSheetReducer,
  chart: chartReducer,
});

export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>;
