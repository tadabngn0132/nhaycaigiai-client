import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createRegistration } from '../api/registrationApi'
import type { RegistrationData } from '../model/registrationSchema'
import type { RegistrationResponse } from '../model/registrationTypes'
import { getCurrentRegistration } from '../storage/registrationStorage'

type RegistrationState = {
  current: RegistrationResponse | null
  status: 'idle' | 'submitting' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: RegistrationState = {
  current: getCurrentRegistration(),
  status: 'idle',
  error: null,
}

export const submitRegistration = createAsyncThunk<
  RegistrationResponse,
  RegistrationData,
  { rejectValue: string }
>('registration/submit', async (data, { rejectWithValue }) => {
  try {
    return await createRegistration(data)
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : 'Không thể gửi đăng ký. Vui lòng thử lại.'
    return rejectWithValue(message)
  }
})

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    clearRegistration(state) {
      state.current = null
      state.status = 'idle'
      state.error = null
    },
    clearRegistrationError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitRegistration.pending, (state) => {
        state.status = 'submitting'
        state.error = null
      })
      .addCase(submitRegistration.fulfilled, (state, action) => {
        state.current = action.payload
        state.status = 'succeeded'
      })
      .addCase(submitRegistration.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Không thể gửi đăng ký. Vui lòng thử lại.'
      })
  },
})

export const { clearRegistration, clearRegistrationError } = registrationSlice.actions
export default registrationSlice.reducer
