import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function Home() {
    const { user, isAuthenticated, isLoading, logout } = useAuth0();
    console.log(user)
    if (isLoading){
        return <div className="loading">Loading ...</div>
    }
  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center">
        <div className="bg-white md:container p-4 shadow-md">
        {isAuthenticated && <div className="flex flex-col items-center">
            <img src={user.picture} alt={user.name} className="mb-2"/>
            <p>Welcome, <strong>{user.name}</strong>!</p>
            <p>{user.email}</p>
            <Link to="/submission" className="bg-slate-900 m-2 hover:bg-slate-700 text-white px-4 py-2">Start new Submission</Link>
            <button className="link" onClick={()=>{logout()}}>Logout</button>
        </div>}
        {!isAuthenticated && <div className="flex flex-col items-center gap-2">
            <h1 className="font-bold">Welcome to the home page</h1>
            <hr />
            <p>Please <Link className="link" to="/login">login</Link> to continue</p>
            </div>}
        </div>
    </div>
  )
}

export default Home