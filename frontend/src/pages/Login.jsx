import { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

function Login(){

  const [form,setForm] = useState({
    email:"",
    password:""
  })

  const navigate = useNavigate()

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const submit = async(e)=>{

    e.preventDefault()

    const res = await API.post("/login",form)

    localStorage.setItem("token",res.data.token)

    navigate("/dashboard")

  }

  return(

    <div className="form">

      <h2>Login</h2>

      <form onSubmit={submit}>

        <input name="email" placeholder="Email" onChange={handleChange} />

        <input name="password" placeholder="Password" type="password" onChange={handleChange} />

        <button>Login</button>

      </form>

    </div>

  )

}

export default Login