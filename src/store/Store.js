import { configureStore } from '@reduxjs/toolkit';
import deviceInfoSlice from './deviceInfoSlice';
import loginSlice from './login-store/loginSlice';
import videoOverlaySlice from './videoOverlaySlice';
import protectedSlice from './protectedSlice';
import cartSlice from './register-cart/cartSlice';
import brandSlice from './brand-register/brandSlice';
import currentOrderSlice from './dashboard/current-orders/currentOrderSlice';
import historySlice from './dashboard/history/historySlice';
import calendarSlice from './calendar-store/calendarSlice';
import creativeWorkSlice from './dashboard/creative-work/creativeWorkSlice';

// const combineReducer = combineReducers({
//   deviceInfoSlice,
//   videoOverlaySlice,
//   loginSlice,
//   protectedSlice,
//   cartSlice,
//   brandSlice,
//   currentOrderSlice,
//   historySlice,
//   calendarSlice,
//   creativeWorkSlice,
// });

// export const makeStore = () =>
//   configureStore({
//     reducer: combineReducer,
//   });

export const store = configureStore({
  reducer: {
    deviceInfoSlice,
    videoOverlaySlice,
    loginSlice,
    protectedSlice,
    cartSlice,
    brandSlice,
    currentOrderSlice,
    historySlice,
    calendarSlice,
    creativeWorkSlice,
  },
});

// export const wrapper = createWrapper(makeStore);
