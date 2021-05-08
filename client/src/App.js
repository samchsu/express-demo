import './App.css';
import Button from "react-bootstrap/Button";
import React, {useState, useEffect, useRef} from 'react';

// Could support batch operations in the future
function App() {
  let textInput = React.createRef();
  const [apiResponse, setApiResponse] = useState("")
  const firstNameCreate = useRef(null);
  const lastNameCreate = useRef(null);
  const ageCreate = useRef(null);
  const idCreate = useRef(null);
  const firstNameEdit = useRef(null);
  const lastNameEdit = useRef(null);
  const ageEdit = useRef(null);
  const idEdit = useRef(null);

  
  function CallAPI() {
    fetch("http://localhost:8000/demo/users")
          .then(res => res.text())
          .then(res => setApiResponse(res))
          .catch(err => err);
  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log(textInput.current.value);
    var url = "http://localhost:8000/demo/users/" + textInput.current.value;
    fetch(url)
    .then(res => res.text())
    .then(res => setApiResponse(res))
    .catch(err => err);
  };

  const handleSubmitAll = event => {
    event.preventDefault();
    console.log(textInput.current.value);
    fetch("http://localhost:8000/demo/users/")
    .then(res => res.text())
    .then(res => setApiResponse(res))
    .catch(err => err);
  };

  const handleCreate = event => {
    event.preventDefault();
    console.log(textInput.current.value);
    fetch("http://localhost:8000/demo/users/total")
    .then(res => res.json())
    .then(res => {
      var integerId = parseInt(res.numOfUsers);
      integerId += 1;
      console.log(integerId)
      fetch("http://localhost:8000/demo/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          "firstname": firstNameCreate.current.value,
          "lastname": lastNameCreate.current.value,
          "age": ageCreate.current.value,
          "id": integerId,
        })
      })
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(err => err);
    })
  };

  const handleEdit = event => {
    event.preventDefault();
    console.log(textInput.current.value);
    var url = "http://localhost:8000/demo/users/" + idEdit.current.value;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "firstname": firstNameEdit.current.value,
        "lastname": lastNameEdit.current.value,
        "age": ageEdit.current.value,
        "id": idEdit.current.value
      })
    })
    .then(res => res.text())
    .then(res => setApiResponse(res))
    .catch(err => err);
  };

  function DeleteItem() {
    var url = "http://localhost:8000/demo/users/" + textInput.current.value;
    fetch(url, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      }
    })
    .then(res => res.text())
    .then(res => setApiResponse(res))
    .catch(err => err);
  }

  useEffect(() => {
    CallAPI();
  }, []);

  return (
    <div>
      <br/>
          <b> Search for Pre-existing User: </b>
        <br/>
      <input ref={textInput} placeholder="Search for User by ID..." />
      <Button className="icon" onClick={handleSubmit}> Submit </Button>
      <Button variant="link" className="admin-back-btn" onClick={DeleteItem}>Delete User</Button>
      <Button className="icon" onClick={handleSubmitAll}> Show All </Button>
      <br/>
      <form onSubmit = {handleCreate}>
        <label>
          <br/>
          <b> Create New User: </b>
          <br/>
          First Name:
          <input type="text" placeholder="Enter First Name..." name="firstname" ref={firstNameCreate}/>
          Last Name:
          <input type="text" placeholder="Enter Last Name..." name="lastname" ref={lastNameCreate}/>
          Age:
          <input type="text" placeholder="Enter Age..." name="age" ref={ageCreate}/>
        </label>
        <button>Submit</button>
      </form>
      <form onSubmit = {handleEdit}>
        <label >
          <br/>
          <b> Edit Pre-existing User: </b>
          <br/>
          First Name:
          <input type="text" placeholder="Enter First Name..." name="firstname" ref={firstNameEdit}/>
          Last Name:
          <input type="text" placeholder="Enter Last Name..." name="lastname" ref={lastNameEdit}/>
          Age:
          <input type="text" placeholder="Enter Age..." name="age" ref={ageEdit}/>
          Id:
          <input type="text" placeholder="Enter ID..." name="id" ref={idEdit}/>
        </label>
        <button>Submit</button>
      </form>
        <br/>
        <b> Pre-existing Users: </b>
          <br/>
          {apiResponse}
      </div>
  );
}

export default App;
