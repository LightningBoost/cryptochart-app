import {combineReducers} from 'redux';
import {themeReducer} from './theme/reducer';
import {bottomSheetReducer} from './bottomSheet/reducer';

const rootReducers = combineReducers({
  theme: themeReducer,
  bottomSheet: bottomSheetReducer,
});

export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>;
