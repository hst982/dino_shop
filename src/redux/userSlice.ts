// store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Role = "USER" | "ADMIN" | "SUPERADMIN" | "STAFF" | "MANAGER"

export type User = {
  id: string
  name: string
  email: string
  avatar?: string | null
  role: Role
}

const initialState: User = {
  id: '',
  name: '',
  email: '',
  avatar: null,
  role: "USER",
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<User>) => action.payload,
    clearUser: () => initialState,
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
