import {combineReducers} from 'redux';
import {themeReducer} from './theme/reducer';
import {bottomSheetReducer} from './bottomSheet/reducer';
import {chartReducer} from './chart/reducer';

const rootReducers = combineReducers({
  theme: themeReducer,
  bottomSheet: bottomSheetReducer,
  chart: chartReducer,
});

export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>;
