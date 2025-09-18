import Home from "./components/HomePage"
import AuthDialog from "./components/Login_Signup"
import JournalHome from "./components/MainPage"
import MinimalistEcom from "./components/MinEcom";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";
import LandingPage from "../../../MY_Projects/MERN_Stack_Apps/ImageGenApp/frontend/src/pages/LandingPage";
// import {user,dispatch} from 
function App() {
    const {user} = useAuthContext();
    return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/main' element={user ? <JournalHome/> : <Navigate to='/auth'/>}/>
          <Route exact path='/auth' element={!user ? <AuthDialog/> : <Navigate to='/main'/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
