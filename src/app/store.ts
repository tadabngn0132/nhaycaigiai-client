import { configureStore } from '@reduxjs/toolkit'
import registrationReducer from '../features/registration/store/registrationSlice'
import { setCurrentRegistration } from '../features/registration/storage/registrationStorage'

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
})

let previousRegistration = store.getState().registration.current

store.subscribe(() => {
  const currentRegistration = store.getState().registration.current

  if (currentRegistration !== previousRegistration) {
    previousRegistration = currentRegistration
    setCurrentRegistration(currentRegistration)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
