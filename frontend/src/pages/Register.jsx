import { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

function Register() {

  const [form, setForm] = useState({
    name:"",
    email:"",
    password:""
  })

  const navigate = useNavigate()

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const submit = async(e)=>{
    e.preventDefault()

    await API.post("/register",form)

    alert("Registered Successfully")

    navigate("/")
  }

  return (

    <div className="form">

      <h2>Register</h2>

      <form onSubmit={submit}>

        <input name="name" placeholder="Name" onChange={handleChange} />

        <input name="email" placeholder="Email" onChange={handleChange} />

        <input name="password" placeholder="Password" type="password" onChange={handleChange} />

        <button>Register</button>

      </form>

    </div>

  )

}

export default Register