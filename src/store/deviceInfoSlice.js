import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  width: null,
  height: null,
  scrollTop: 0,
  isMobile: false,
  isTablet: false,
  isDesktop: true,
};

const deviceInfoSlice = createSlice({
  name: 'DEVICE_INFO',
  initialState,
  reducers: {
    updatePageDimensions: (state, action) => {
      state.isMobile = action.payload.isMobile;
      state.isTablet = action.payload.isTablet;
      state.isDesktop = action.payload.isDesktop;
    },
    updateScrollPosition(state, action) {
      state = action.payload;
    },
    updateDeviceType(state, action) {
      state = { scrollTop: action.payload };
    },
  },
});

export const { updatePageDimensions, updateScrollPosition, updateDeviceType } =
  deviceInfoSlice.actions;
export default deviceInfoSlice.reducer;
