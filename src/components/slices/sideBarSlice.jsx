import { createSlice } from "@reduxjs/toolkit"

const sideBarState = {
      isOpen: true,
      allAsk: [],
      recentClick: true,
}

export const sideBarSlice = createSlice({
      name: 'sideBar',
      initialState: sideBarState,
      reducers: {
            toggleSideBar: (state, action) => {
                  return {
                        ...state,
                        isOpen: !state.isOpen
                  }
            },
            setRecentClick: (state, action) => {
                  return {
                        ...state,
                        recentClick: !state.recentClick
                  }
            },
            setAllAsk: (state, action) => {

                  if (state.allAsk.length >= 5) {
                        state.allAsk.shift();
                  }

                  const doubleItem = state.allAsk.some((ask) => ask === action.payload);

                  if (!doubleItem) {
                        state.allAsk.push(action.payload);
                  }
            }
      }
})

export const { toggleSideBar, setAllAsk, setRecentClick } = sideBarSlice.actions;