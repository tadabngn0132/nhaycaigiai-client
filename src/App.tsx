import { Toaster } from 'react-hot-toast'
import RegistrationPage from './pages/RegistrationPage'
import './App.css'

function App() {
  return (
    <>
      <RegistrationPage />
      <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
    </>
  )
}

export default App
