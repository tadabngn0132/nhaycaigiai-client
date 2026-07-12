import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ConfirmationPage from './pages/ConfirmationPage'
import HomePage from './pages/HomePage'
import ProgramDetailPage from './pages/ProgramDetailPage'
import RegistrationPage from './pages/RegistrationPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<ProgramDetailPage />} path="/program/:slug" />
        <Route element={<RegistrationPage />} path="/registration" />
        {/* MVP chưa tích hợp SePay: giữ URL cũ nhưng bỏ qua bước payment. */}
        <Route element={<Navigate replace to="/confirmation" />} path="/payment" />
        <Route element={<ConfirmationPage />} path="/confirmation" />
      </Routes>
      <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
    </BrowserRouter>
  )
}

export default App
