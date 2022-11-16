import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Report = ({status}) => {
  switch (status){
    case true:
      return <div className="h-60 w-full flex flex-col justify-center items-center rounded border-green-200 bg-green-100 border text-green-900">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 className="text-3xl">Passed</h1>
      <p>Congratulation! You submission is correct!</p>
      </div>
    case false:
      return <div className="h-60 w-full flex flex-col justify-center items-center rounded border-red-200 bg-red-100 border text-red-900">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <h1 className="text-3xl">Failed</h1>
      <p>Sorry! Your submission is incorrect!</p>
      </div>
    default:
      return <div className="h-60 w-full flex flex-col justify-center items-center rounded border-slate-200 bg-slate-100 border text-slate-900">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
      <h1 className="text-3xl">Pending</h1>
      <p>Please wait for the result!</p>
      </div>
  }
}

function Response() {
  const { isLoading, user } = useAuth0();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get("/api/user/"+user.sub)
      .then(res => {
        if (res.data.error){
          navigate("/")
        }else{
          setData(res.data);
        }
    })
  }, [])
  return (
    <div className="container mx-auto mt-8 space-y-2">
      <h1 className="text-3xl font-bold mb-2">Submission Result</h1>
      {/* <div className="px-4 py-4 bg-green-200 text-green-800">
        <strong>Excellent!</strong> Your submission is correct!
      </div>
      <div className="px-4 py-4 bg-red-200 text-red-800">
        <strong>Oh!</strong> You submission is incorrect
      </div> */}
      <Report status={data?.history[data?.history.length - 1].response}/>
      <Link to="/" className="inline-block px-4 py-2 text-white bg-slate-500 hover:bg-slate-700">Back to home</Link>
      <h2 className="text-xl font-bold">History</h2>
      {data && <table className="table table-auto w-full">
        <thead className="bg-slate-200">
          <th>#</th>
          <th className="w-32">Submission</th>
          <th>Time</th>
          <th>Response</th>
        </thead>
        <tbody>
          {data.history.map((item, index) => (
            <tr key={index}>
              <th>{index+1}</th>
              <td className="item-center"><img className="max-w-[8rem] h-auto"src={item.path} alt="" /></td>
              <td>{new Date(item.timestamp).toLocaleString('th-TH')}</td>
              <td>{item.response ? "Passed" : "Failed"}</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  )
}

export default Response