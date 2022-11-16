import { Routes, Route, Navigate  } from 'react-router-dom';

// pages
import Home from './Home';
import Login from './Login';
import Error from './Error';
import UploadFile from './UploadFile';
import Response from './Response';

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationGuard = (element) => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading){
    return <div className="loading">Loading ...</div>
  }
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function MainRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/submission" element={AuthenticationGuard(<UploadFile/>)} />
        <Route path="/response" element={AuthenticationGuard(<Response/>)} />
        
        <Route path="/*" element={<Error/>}/>
    </Routes>
  )
}

export default MainRouter