import { useEffect,useState } from "react"
import API from "../services/api"

function Dashboard(){

const [title,setTitle] = useState("")
const [description,setDescription] = useState("")
const [category,setCategory] = useState("Academic")

const [search,setSearch] = useState("")
const [grievances,setGrievances] = useState([])

const loadGrievances = async()=>{

const res = await API.get("/grievances")

setGrievances(res.data)

}

useEffect(()=>{

loadGrievances()

},[])


const submit = async(e)=>{

e.preventDefault()

await API.post("/grievances",{
title,
description,
category
})

setTitle("")
setDescription("")

loadGrievances()

}


// DELETE
const deleteGrievance = async(id)=>{

await API.delete(`/grievances/${id}`)

loadGrievances()

}


// UPDATE
const updateStatus = async(id)=>{

await API.put(`/grievances/${id}`,{
status:"Resolved"
})

loadGrievances()

}


// SEARCH
const searchGrievance = async()=>{

const res = await API.get(`/grievances/search/title?title=${search}`)

setGrievances(res.data)

}


return(

<div className="dashboard">

<h2>Student Grievance Dashboard</h2>

<form onSubmit={submit}>

<input 
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<select onChange={(e)=>setCategory(e.target.value)}>

<option>Academic</option>
<option>Hostel</option>
<option>Transport</option>
<option>Other</option>

</select>

<button>Submit Grievance</button>

</form>


{/* SEARCH */}

<div className="search">

<input
placeholder="Search grievance"
onChange={(e)=>setSearch(e.target.value)}
/>

<button onClick={searchGrievance}>
Search
</button>

</div>


<div className="cards">

{grievances.map((g)=>(

<div className="card" key={g._id}>

<h3>{g.title}</h3>

<p>{g.description}</p>

<p>Category: {g.category}</p>

<p>Status: {g.status}</p>

<button onClick={()=>updateStatus(g._id)}>
Resolve
</button>

<button onClick={()=>deleteGrievance(g._id)}>
Delete
</button>

</div>

))}

</div>

</div>

)

}

export default Dashboard