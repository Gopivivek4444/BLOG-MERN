import { createSlice } from '@reduxjs/toolkit'
import { set } from 'react-hook-form'

const initialState = {
  isLoggedIn: false,
  user: {},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isLoggedIn = true
    },
    clearUser: (state) => {
      state.user = {}
      state.isLoggedIn = false
    }
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer

