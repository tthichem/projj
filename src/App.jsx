import './index.css'
import React,{useState,useEffect} from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Home from "./pages/Home/Home";
import Admin from './pages/Admin/Admin';
import Add from './pages/Add/Add';
import Lister from './pages/Lister/Lister';
import Reports from './pages/Reports/Reports';
import AddUser from './pages/AddUser/AddUser';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Upload from './pages/upload/Upload';
import ProtectedRoutes from './components/ProtectedRoures/ProtectedRoutes';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [theme,setTheme] = useState("light");
  const [token ,setToken] = useState("");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>

    {showLogin ? <Login setShowLogin={setShowLogin} setToken={setToken}/> : <></>}
    <div className={`app ${theme}`}>

    <Routes>
      <Route path='/' element={<Home
        theme ={theme}
        setTheme={setTheme} 
        showLogin={showLogin} 
        setShowLogin={setShowLogin} 
        token={token} 
        setToken={setToken}
      />}/>

      <Route path='/upload' element={
        <ProtectedRoutes allowedRoles={['prof']}>
          <Upload
            theme={theme}
            setTheme={setTheme}
            token={token}
            setToken={setToken}
          />
        </ProtectedRoutes>
      } />

      <Route path='/admin' element={
        <ProtectedRoutes allowedRoles={['superuser']}>
          <Admin
            theme={theme}
            setTheme={setTheme}
            token={token}
            setToken={setToken}
          />
        </ProtectedRoutes>
      } >
        <Route path="/admin" element={<AdminDashboard />} />
          <Route path="add" element={<Add theme={theme}/>} />
          <Route path="liste" element={<Lister theme={theme}/>} />
          <Route path="reports" element={<Reports theme={theme}/>}/>
          <Route path="adduser" element={<AddUser theme={theme}/>}/>
      </Route>
    </Routes>
    </div>
    </>
  )
}

export default App
