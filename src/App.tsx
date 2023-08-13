import { Routes, Route, Navigate } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Menu } from './Menu/Menu';
import { Reviews } from './Reviews/Reviews';
import { Login } from './Login/Login';
import { AuthenticationProvider } from './Contexts/AuthenticationContext';

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <Menu />
        <Routes>
          <Route path="/" element={<Navigate to="/all-reviews" />}></Route>  
          <Route path="/all-reviews" element={<Reviews style="all"/>}></Route>  
          <Route path="/summary" element={<Reviews style="summary" />}></Route>  
          <Route path="/login" element={<Login />}></Route>  
        </Routes>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
