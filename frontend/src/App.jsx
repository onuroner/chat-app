import { Routes,Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Oval } from 'react-loader-spinner'
import { Toaster } from "react-hot-toast"
import { useThemeStore } from "./store/useThemeStore"

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  const {theme} = useThemeStore();

  useEffect(() => {
    checkAuth();

  }, [checkAuth]);

  console.log({authUser})
  document.getElementsByTagName('html')[0].setAttribute('data-theme', theme);

  if(isCheckingAuth && !authUser){
    return (<div className="flex items-center justify-center h-screen">
      <Oval
  visible={true}
  height="50"
  width="50"
  color="#4fa94d"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>)
  }

  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"}/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"}/> } />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"}/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/login"}/>} />
      </Routes>

      <Toaster />
    </div>
    
  )
}

export default App