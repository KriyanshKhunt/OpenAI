import { createSlice } from "@reduxjs/toolkit"

const mainState = {
      inputValue: '',
      isStartChat: false,
      loading: false,
      newChat: false,
      open: false,
      data: [
            {
                  text: 'this is question',
                  isBot: false,
            },
            {
                  text: 'this ia ans by bot',
                  isBot: true,
            }
      ],
}

export const mainSlice = createSlice({
      name: 'main',
      initialState: mainState,
      reducers: {
            onChangeText: (state, action) => {
                  return {
                        ...state,
                        inputValue: action.payload,
                  }
            },
            startChat: (state, action) => {
                  return {
                        ...state,
                        isStartChat: action.payload,
                  }
            },
            setData: (state, action) => {
                  return {
                        ...state,

                  }
            },
            setLoading: (state, action) => {
                  return {
                        ...state,
                        loading: action.payload,
                  }
            },
            newChat: (state, action) => {
                  return {
                        ...state,
                        newChat: !state.newChat
                  }
            },
            setOpen: (state, action) => {
                  return {
                        ...state,
                        open: action.payload,
                  }
            }
      }
})

export const { onChangeText, startChat, setLoading, newChat, setOpen } = mainSlice.actions;