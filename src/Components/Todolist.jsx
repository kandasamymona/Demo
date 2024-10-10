import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'

const Todolist = () => {
    const [todo,setTodo]=useState('');
    const[name,setName]=useState('');
    const[db,setDb]=useState([])
    // data posting
    function dataPost(){
      axios.post("http://localhost:3000/posts",{todo,name})
      .then(() =>{
        alert("data has been posted")
        setTodo('')
        setName('')
      })
      .catch(()=> {
        alert("data has not been posted")
      })
    }

    function getData(){
       axios.get("http://localhost:3000/posts")
        .then((response)=>{
          setDb(response.data)
          alert("Data has been retrived")
        })
        .catch(()=>{
          alert("Data has not been retrived")
    })
    }
    function updateDate(id,data){
      axios.put(`http://localhost:3000/posts/${id}`,{todo:data,name:data})
      .then(() =>{
        console.log("data updated");
        getData();
      })
      .catch(()=>{
        console.log("data not updated");
      })
    }

    function newData(id){
      const data=prompt("enter the data")
      updateDate(id,data);
    }

    function deleteData(id) {
      axios
        .delete(`http://localhost:3000/posts/${id}`)
        .then(() => {
          alert('Data has been deleted');
          getData(); // Refresh the data after deletion
        })
        .catch(() => {
          alert('Data has not been deleted');
        });
    }
  


  console.log(db)
  return (
    <div> 

        <p>
            {todo}
        </p>
        <p>
            {name}
        </p>
        <TextField id="outlined-basic" label="Todo" variant="outlined"
        value={todo}
        onChange={(ref)=> setTodo(ref.target.value)}

        />
        <TextField id="outlined-basic" label="Name" variant="outlined"
        value={name}
        onChange={(ref)=> setName(ref.target.value)}/>
        <br />
        <Button variant="outlined" onClick={dataPost}>Post</Button>
        <Button variant="outlined" onClick={getData}>Get</Button>
        <Button variant="outlined" onClick={deleteData}>Delete</Button>
        

        <div>
         <ul>
          {
            db.map((item) =>(

            
            <li key={item.id}>{item.todo}<Button onClick={()=>newData(item.id)} >Edit</Button>
            <Button onClick={() => deleteData(item.id)}>Delete</Button> {/* Delete button */}</li>
            ))
          }

         </ul>



        </div>


        
    </div>
  )
}

export default Todolist