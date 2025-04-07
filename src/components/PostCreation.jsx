import { Button, Dialog, DialogTitle, DialogContent, DialogActions,} from "@mui/material"
import {useState} from "react"
import axios from 'axios'
import { CircularProgress } from "@mui/material";



const PostCreation=()=>{
  const [msg,setmsg]=useState("")
  const [resmsg,setresmsg]=useState("")
const [open,setopen]=useState(false)
const [loading,setloading]=useState(false)
const [data,setData]=useState({
  title:"",
  content:"",
  author:""
})

const backend=import.meta.env.VITE_BACKEND_URL

function handleClose(){
setopen(false)
}

function handleChange(e){
    setData({...data,[e.target.name]:e.target.value})
    
}

async function handleSubmit(e){
e.preventDefault()
setloading(true)
try{
const result=await axios.post(`${backend}/reactpost`,data)

console.log(result.data.message)
setData({
  title:"",
  content:"",
  author:""
})
setresmsg("Success")
setmsg("Your Blog has Been Posted!")
}
catch(err){
  console.log(err)
  setresmsg("Failed to Post")
  setmsg("Blog Can't be Posted!")
}
setloading(false)
setopen(true)
}
const pstyle={
    display:"flex",
    justifyContent:"center",
    alignItems:"Center",
    fontFamily: "Winky Sans",
    fontWeight: "500",
}
const fstyle={
    height:"100%",
    width:"100%",
    textAlign:"center",
    margin:"20px"
}

const contentstyle={
    fontWeight:"Bold",
    border: "1px solid #ccc",
    fontSize: "16px",
    width:"95%", 
    height:"300px",
    borderRadius:"20px",
    opacity:"0.5",
    padding:"10px",
    marginTop:"10px"
    
}


return (
<div style={pstyle}>
<div style={fstyle}>
<form  onSubmit={handleSubmit}>

<label style={{fontSize:"20px"}}>Title</label><br/>
<input style={{width: "40%",  /* Screen ke hisaab se adjust ho */
  maxWidth: "700px", /* Bahut bada na ho */
  height: "50px", /* Thoda bada taki prominent lage */
  fontSize: "20px", /* Title bada aur readable ho */
  fontWeight: "bold",
  padding: "10px",
  borderRadius: "20px",
  border: "1px solid #ccc",opacity:"0.5",marginBottom:"10px"}} name="title" required value={data.title} onChange={handleChange}/><br/>

<label style={{fontSize:"20px"}}>Content</label><br/>

<textarea style={contentstyle} placeholder="Start writing your thoughts..."
required  name="content" value={data.content} onChange={handleChange}/><br/>
<label>Written By: </label>
<input style={{ marginLeft:"10px",width: "25%",maxWidth: "400px",
  height: "40px", 
  padding: "8px",
  fontSize: "16px",
  borderRadius: "20px",
  border: "1px solid #ccc",
  opacity:"0.5"}}required name="author" value={data.author} onChange={handleChange}/><br/>
<Button variant='outlined' color="inherit" style={{marginTop:"15px"}} type="submit">{loading? (<> Posting... <CircularProgress size={25} color="inherit" style={{ marginLeft: 8 }}/> </>):("Post")}</Button>
  </form>
</div>
<Dialog open={open} onClose={handleClose}>
        <DialogTitle>{resmsg}</DialogTitle>
        <DialogContent>{msg}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
</div>

)
}
export default PostCreation


