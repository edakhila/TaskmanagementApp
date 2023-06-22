import React,{useState,useEffect, useRef} from "react"
import { Navbar,Container,Nav,Dropdown,Modal,Button,Form,Table,Row,Col } from 'react-bootstrap';

const TaskManagmentDash = () =>{
    var idCount = useRef(1);
    const defaltData = [{id:1,title:"Task1",description:"Task1 desc",dueDate:"123456"},{id:2,title:"mahii",description:"hello",dueDate:"123456"},{id:3,title:"mahii",description:"hello",dueDate:"123456"}]
    const [dataList,setDataList] = useState([]);
    const [showAddModal,setShowAddModal]= useState(false);
    const [showUpdateModal,setShowUpdateModal]= useState(false);
    const [updateData,setUpdateData] = useState([])

    const deleteTast = (task) =>{
        if (window.confirm(`Are you sure, you want to delete Task ${task.title}`)) {
            const UpdatedDataList = dataList.filter(val => val.id!=task.id)
            setDataList(UpdatedDataList);
      }  
    }

    const validateData = (val) =>{
        if(val.title && val.title.trim()!= ''){
            if(val.description && val.description.trim()!=''){
                if(val.dueDate && val.dueDate.trim()!=''){
                    var today = new Date();
                    today.setHours(0,0,0,0);
                    var choosed = new Date(val.dueDate);
                    if(choosed-today>=0){
                        return true;
                    }
                    else{
                        alert("Due date cannot be past")
                    }
                }
                else{
                    alert("Due date cannot be empty")
                }
            }
            else{
                alert("Description cannot be empty")
            }
        }
        else{
            alert("Title cannont be empty")
        }
        return false;
    }

    const AddTask = (props) =>{
        const newTask = {
            id:idCount.current
        }
        return(
            <>
            <Modal {...props}>
                <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="Text"
                            autoFocus
                            placeholder="Task Title"
                            onChange={(e)=>{newTask.title=(e.target.value)}}
                        /><br />
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="Text"
                            placeholder="Description"
                            onChange={(e)=>{newTask.description=(e.target.value)}}
                        /><br />
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="Date"
                            placeholder="Due Date"
                            onChange={(e)=>{
                                newTask.dueDate=(e.target.value);
                            }}
                        /><br />
                    </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary"  onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>{
                    if(validateData(newTask)){
                        console.log(newTask)
                        dataList.push(newTask);
                        setDataList(dataList)
                        props.onHide();
                        idCount.current=idCount.current+1
                    }
                    }}>
                    Add Item
                </Button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }

    const UpdateTask = (props) =>{
        var val = {};
        val.id = updateData.id;
        return(
            <>
            <Modal {...props}>
                <Modal.Header closeButton>
                <Modal.Title>Update Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="Text"
                            autoFocus
                            defaultValue={updateData.title}
                            placeholder={updateData.title}
                            onChange={(e)=>{val.title=(e.target.value)}}
                        /><br />
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="Text"
                            defaultValue={updateData.description}
                            onChange={(e)=>{val.description=(e.target.value)}}
                        /><br />
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="Date"
                            defaultValue={updateData.dueDate}
                            onChange={(e)=>{ val.dueDate=(e.target.value)}}
                        /><br />
                    </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary"  onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>{
                    
                        val.title = val.title && val.title.trim()!=''? val.title:updateData.title;
                        val.description = val.description && val.description.trim()!=''? val.description:updateData.description;
                        val.dueDate = val.dueDate && val.dueDate.trim()!=''? val.dueDate:updateData.dueDate;
                        console.log(val)
                        // dataList.forEach((v)=>{
                        //     if(v.title==val.title){
                        //         alert("Task with title "+val.title+" already exists")
                        //         return;
                        //     }
                        // });
                        dataList.forEach((v)=>{
                            if(v.id==val.id){
                                v.title=val.title
                                v.description=val.description
                                v.dueDate=val.dueDate
                            }
                        });
                        setDataList(dataList)
                        props.onHide();
                    }}>
                    Update Item
                </Button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }

    return(
        <>
            <AddTask
                show={showAddModal}
                onHide={()=>{setShowAddModal(false)}}
            />
            <UpdateTask
                show={showUpdateModal}
                onHide={()=>{setShowUpdateModal(false)}}
            />
            <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/">Task Managment<a href="/"></a></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        
                        <Nav.Link 
                        style={{ paddingLeft: '500px' }}
                        onClick={()=>{setShowAddModal(true)}}>Add Task</Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;
                        {/*<Nav.Link onClick={()=>{navigate('/ownerLogin');}}>Owner Login</Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp; */}
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style = {{padding:"200px",paddingTop:"20px"}}>
                <Table>
                    <thead style={{fontWeight:"bolder"}}>
                        <tr>
                            <td>ID</td>
                            <td>Title</td>
                            <td>Description</td>
                            <td>Due Date</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataList  && dataList.map((val)=>{
                                return(
                                        <>
                                            <tr>
                                                <td>{val.id}</td>
                                                <td>{val.title}</td>
                                                <td>{val.description}</td>
                                                <td>{val.dueDate}</td>
                                                <td>
                                                    {
                                                        <>
                                                            <button  onClick={()=>{
                                                                setUpdateData([]);
                                                                setUpdateData(JSON.parse(JSON.stringify(val)));
                                                                setShowUpdateModal(true);
                                                            }}>Update</button>&nbsp;&nbsp;&nbsp;
                                                            <button onClick={()=>{deleteTast(val)}}>Delete</button>
                                                        </>
                                                    }
                                                </td>
                                            </tr>
                                        </>                     
                                )
                            })                    
                        }
                    </tbody>
                </Table>
            {
                dataList.length==0 ? 
                <h5 style = {{position:"relative",left:"40%",top:"30px"}}>No Task added yet</h5>
                :null
            }
            </div>
        </>
    )
}

export default TaskManagmentDash;