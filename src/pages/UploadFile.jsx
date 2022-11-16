import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';

function UploadFile() {
  const navigate = useNavigate();
  const { user } = useAuth0()
  const dropZone = useRef()
  const [file, setFile] = useState(null)
  const [requesting, setRequesting] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setRequesting(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("user_id", user.sub)
    axios.post("/api/upload", formData).then(res =>{
      if (res.data.status==='success'){
        navigate('/response')
      }else{
        alert('Upload failed')
      }
      setRequesting(false)
    })
  }
  // https://stackoverflow.com/a/64582388/16593765
  const filePickerOpen = () => {
    const fi = document.createElement('input')
    fi.type = 'file'
    fi.accept = 'image/*'
    fi.multiple = false
    fi.onchange = (e) => {
      setFile(e.target.files[0])
      fi.remove()
    }
    fi.click()
  }
  const handleDrop = (e) => {
    e.preventDefault();
    dropZone.current.classList.remove('bg-slate-200')
    if (e.dataTransfer.items) {
      if (e.dataTransfer.items.length > 1) {
          alert('You can only upload one file at a time!')
      }
      if (e.dataTransfer.items[0].kind==='file'){           
          setFile(e.dataTransfer.files[0])
      }
    }
    e.stopPropagation();
  }
  const handleDragOver = (e) => {
    e.preventDefault();
    dropZone.current.classList.add('bg-slate-200')
  }
  const handleDragLeave = (e) => {
    e.preventDefault();
    dropZone.current.classList.remove('bg-slate-200')
  }
  if (requesting){
    return (<div>Submiting...</div>)
  }
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold">Submit a File</h1>
        <p>Welcome to testing system. You have to submit an image file satisfy the conditions to pass the exam</p>
        <ol className="list-decimal list-inside">
            <li>Must be JPG file</li>
            <li>File size is not exceed 50 KB</li>
            <li>File size dimension is not exceed 200 x 200 px</li>
        </ol>
        <div ref={dropZone} className="border-2 border-dashed mt-8" onClick={filePickerOpen} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
        {!file && <div className="flex justify-center items-center w-full h-60 max-h-full cursor-pointer" id="drop-zone">
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                <svg className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
        </div>}
        {file && <div className="flex justify-center items-center w-full h-60 max-h-full cursor-pointer" id="drop-zone">
            <div className="flex flex-col justify-center items-center">
                <img src={URL.createObjectURL(file)} alt="preview" className="max-h-[200px] w-auto" />
            </div>
        </div>}
        </div>
        {file && <form onSubmit={handleSubmit} className="space-x-2">
          <button className="px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-700">Submit</button>
          <button type="button" className="px-4 py-2 bg-slate-500 hover:bg-slate-700 text-white" onClick={()=>{setFile(null)}}>Remove File</button>
        </form>}
    </div>
  )
}

export default UploadFile