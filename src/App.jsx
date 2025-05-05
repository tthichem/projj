import './index.css'
import { Routes, Route } from "react-router-dom";
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
  return (
    <>
    <div className="app">
    <Routes>
      <Route path='/' element={<Home/>}/>

      <Route path='/upload' element={
        <ProtectedRoutes allowedRoles={['prof']}>
          <Upload/>
        </ProtectedRoutes>
      } />

      <Route path='/admin' element={
        <ProtectedRoutes allowedRoles={['superuser']}>
          <Admin/>
        </ProtectedRoutes>
      } >
        <Route path="/admin" element={<AdminDashboard />} />
          <Route path="add" element={<Add/>} />
          <Route path="liste" element={<Lister/>} />
          <Route path="reports" element={<Reports/>}/>
          <Route path="adduser" element={<AddUser/>}/>
      </Route>
    </Routes>
    </div>
    </>
  )
}

export default App
