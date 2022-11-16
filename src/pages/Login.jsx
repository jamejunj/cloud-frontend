import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from 'react-router-dom';

function Login() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    if (isAuthenticated){
      return <Navigate to="/"/>
    }
  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center">
    <div className="bg-white min-w-[50%] p-4 shadow-md space-y-2 text-center">
      <h1 className="font-bold text-2xl">Login</h1>
      <div>
        <button className="px-4 py-2 bg-orange-500 text-white hover:bg-orange-700" onClick={loginWithRedirect}>Login with Auth0</button>
      </div>
    </div>
</div>
  )
}

export default Login