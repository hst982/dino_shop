import { configureStore } from "@reduxjs/toolkit"
import userReducer from  './userSlice'

const store = configureStore({
    reducer: {
        users: userReducer
    },
})

export default store
export type RootState = ReturnType<typeof store.getState>