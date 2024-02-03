import React,{useEffect,useState} from "react";
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const App=()=>{
  const [item,setItem]=useState([]);
  const [task,setTask]=useState([]);
  useEffect(()=>{
    axios.get("http://localhost:5000/gettask").then(
      arr=>setItem(arr.data)
    )
  },[])

  const submitHandler=e=>{
    e.preventDefault();
    axios.post("http://localhost:5000/addtask",{todo:task}).then(
      arr=>setItem(arr.data)
    )
    setTask('');
  }

  const deleteHandler=id=>{
    axios.delete(`http://localhost:5000/delete/${id}`).then(
      arr=>setItem(arr.data)
    )
  }
  return(
    <center>
      <br />
      <div>
    <Card style={{ width: '27rem' }} className="card">
    <div className="card-body">
      <center>
        <br />
        <Form onSubmit={submitHandler}>
          <div>
          <InputGroup className="mb-3">
            <Form.Control size="15rem" type="text" value={task} onChange={(e)=>setTask(e.target.value)}/> &nbsp;
            <Button type="submit">submit</Button>
            </InputGroup>
          </div>
        </Form>
        </center>
        <br />
        <div className="main-body">
        {item.map(task=>
          
          <div key={task._id}>
            <ListGroup as="ul" >
            <ListGroup.Item as="li"         className="d-flex justify-content-between align-items-start"
 >{task.todo} &nbsp;
            <Button className="btn-btn-danger btn-sm ml-auto" variant="danger" onClick={()=>deleteHandler(task._id)}>Delete</Button></ListGroup.Item>
            </ListGroup>
          </div>
          )}
          </div>
          
      
    </div>
    </Card>
    </div>
    </center>
  )
}
export default App; 
