import Home from "./components/HomePage"
import AuthDialog from "./components/Login_Signup"
import JournalHome from "./components/MainPage"
import MinimalistEcom from "./components/MinEcom";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";
// import {user,dispatch} from 
function App() {
    return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/main' element={<JournalHome/>}/>
          <Route exact path='/auth' element={<AuthDialog/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
